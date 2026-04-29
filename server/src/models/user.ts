import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  exploredSubjects: {
    type: [String],
    default: [],
  },
});

const Book = mongoose.model("User", userSchema);
export default Book;
