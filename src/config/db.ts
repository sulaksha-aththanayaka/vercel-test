import mongoose from 'mongoose';
import { APPLICATIONS } from './config';
const MONGO_URI= APPLICATIONS.MONGO_URI || ""
const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default dbConnection;
