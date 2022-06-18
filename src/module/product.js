import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    images: Object,
    description: String,
    numReviews: Number,
    rating: Number,
  },
  {
    timestamps: true,
  },
);

const module = mongoose.model('Products', productSchema);

export default module;
