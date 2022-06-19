import express from 'express';
import { getComments } from '../controller/commentController';

const commentRouter = express.Router();

commentRouter.route('/:id').get(getComments);

export default commentRouter;
