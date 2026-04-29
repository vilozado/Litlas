import mongoose, { ConnectOptions } from "mongoose";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "litlas";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDb;
