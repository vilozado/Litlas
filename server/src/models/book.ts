import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
  id: {
    type: String,
    required: true
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
    required: true
  },
  publishedDate: {
    type: String || Number
  },
  description: {
    type: String
  },
  categories: [String],
  thumbnail: {
    type: String
  },
  status: {
    type: String
  }
});

const Book = mongoose.model('book', bookSchema);
export default Book;