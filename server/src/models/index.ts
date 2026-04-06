import mongoose, { ConnectOptions } from "mongoose";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "books";

const connectDb = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
