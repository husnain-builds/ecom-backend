// Product Model
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true},
    images: [
    { 
        url: { type: String, required: true },
        alt: { type: String, },
        _id: false
    },

    ],
    price: { type: Number, required: true },
    discount: {
        type: Number,
        default: 0, // e.g., 10 = 10% off
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: true,
        index: true, // faster search by category
    },
    brand: {
        type: String,
    },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }, // how many users rated
    },
    reviews: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          comment: String,
          rating: { type: Number, min: 1, max: 5 },
          createdAt: { type: Date, default: Date.now }
        }
      ],
    isFeatured: {
        type: Boolean,
        default: false, // useful for homepage banners
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);