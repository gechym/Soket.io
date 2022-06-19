import Comment from '../module/comment';
import AppError from '../util/AppError';
import catchAsync from '../util/catchAsync';

export const getComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ product_id: req.params.id });

  res.status(200).json({
    message: 'success',
    data: {
      comments: comments,
    },
  });
});
