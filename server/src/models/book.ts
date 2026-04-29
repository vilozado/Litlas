import mongoose from "mongoose";

const { Schema } = mongoose;

const bookSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  id: {
    type: String,
    required: true,
    index: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String || Number,
  },
  description: {
    type: String,
  },
  categories: [String],
  thumbnail: {
    type: String,
  },
  status: {
    type: String,
  },
});

bookSchema.index({ id: 1, userId: 1 }, { unique: true });

const Book = mongoose.model("book", bookSchema);
export default Book;
