import type {Mongoose} from 'mongoose';
import {connect, ConnectionStates} from 'mongoose'

// TODO: This is failing and can't figure out why

/**
 Source :
 https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js
 **/

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongooseConnection

if (!cached) {
  global.dbUrl = process.env.MONGODB_URI;
  global.mongooseConnection = {conn: undefined, promise: undefined}
  cached = global.mongooseConnection;
}

export async function dbConnect(): Promise<Mongoose> {
  cached = cached as { promise?: Promise<Mongoose>, conn?: Mongoose }

  if (cached.conn && cached.conn.connection.readyState === ConnectionStates.connected) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }
    if (!global.dbUrl) {
      throw new Error(
        'Please define the MONGODB_URL environment variable inside .env'
      )
    }
    cached.promise = connect(global.dbUrl, opts)
  }

  cached.conn = await cached.promise

  return cached.conn
}
