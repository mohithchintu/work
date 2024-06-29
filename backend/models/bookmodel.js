import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    bookID: {
      type: String,
      required: [true, "BookId is required"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    entry: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
