import Product from '../module/product';
import AppError from '../util/AppError';
import catchAsync from '../util/catchAsync';

export const getProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    message: 'success',
    data: {
      products: products,
    },
  });
});

export const reviews = catchAsync(async (req, res, next) => {
  const { rating } = req.body;

  const { id } = req.params;

  if (!rating || rating <= 0 || rating >= 6) return next(new AppError('rating not valid', 404));

  const product = await Product.findById(id);

  if (!product) return next(new AppError('product not found', 404));

  await Product.findOneAndUpdate(
    { _id: id },
    {
      rating: product.rating + rating,
      numReviews: product.numReviews + 1,
    },
  );

  res.status(200).json({
    message: 'success',
  });
});
