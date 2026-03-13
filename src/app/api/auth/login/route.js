import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword, signToken } from '@/lib/auth';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;

        // DEMO MODE: If no DB, allow "demo@example.com" or any login
        if (!client) {
            console.warn('Login: Running in Demo Mode (No MongoDB)');
            const token = await signToken({
                userId: 'demo_user_id',
                email: email,
            });

            const response = NextResponse.json(
                { message: 'Demo Login successful', user: { email, name: 'Demo User' } },
                { status: 200 }
            );

            response.cookies.set('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24,
                path: '/',
            });
            return response;
        }

        const db = client.db(process.env.MONGODB_DB || 'aura_search');
        const users = db.collection('users');
        // ... rest of existing logic

        const user = await users.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const hashedPassword = await hashPassword(password);
        if (user.password !== hashedPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = await signToken({
            userId: user._id.toString(),
            email: user.email,
        });

        const response = NextResponse.json(
            { message: 'Login successful', user: { email: user.email, name: user.name } },
            { status: 200 }
        );

        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
