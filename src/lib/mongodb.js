import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    connectTimeoutMS: 5000,
};

let client;
let clientPromise = null;

if (uri) {
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }
} else {
    console.warn('MONGODB_URI is missing. Aura Search is running in Mock Mode.');
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
