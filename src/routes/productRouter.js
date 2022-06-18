import express from 'express';
import { getProduct, reviews } from '../controller/productControler';

const productRouter = express.Router();

productRouter.route('/').get(getProduct);
productRouter.route('/:id').patch(reviews);

export default productRouter;
