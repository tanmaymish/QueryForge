import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        if (!client) {
            return NextResponse.json(
                { message: 'Demo Mode: User registration simulated' },
                { status: 201 }
            );
        }

        const db = client.db(process.env.MONGODB_DB || 'aura_search');
        const users = db.collection('users');

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const newUser = {
            email,
            password: hashedPassword,
            name: name || email.split('@')[0],
            createdAt: new Date(),
        };

        await users.insertOne(newUser);

        return NextResponse.json(
            { message: 'User registered successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
