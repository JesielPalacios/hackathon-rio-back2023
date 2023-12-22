import mongoose from 'mongoose';
import config from './config';

export const connectionString =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_DB_URI_TEST
    : config.mongoDBUri;

if (!connectionString) {
  console.error('No hay connection strings para la base de datos de prueba.');
}

const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(config.mongoDBUri!);
    console.log('[database 🍫]: Database is connected to', db.connection.name);
  } catch (err: any) {
    console.log('err', err)
    console.error(err.message);
  }
};

connectToDatabase();
