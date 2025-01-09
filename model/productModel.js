const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: [true, "Product Name is required"] },
    description: { type: String },
    price: { type: Number, required: [true, "Price is required"] },
    stock: { type: Number, required: [true, "Stock is required"] },

    images: { type: Array },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: "true",
    },
    isDeleted: Boolean,
  },
  { timestamps: true }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
