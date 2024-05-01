import express from 'express';
import CommentController from './comment.controller.js';

const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.get('/:id',commentController.getComments);
commentRouter.post('/:id',commentController.addComment);
commentRouter.delete('/:id',commentController.deleteComment);
commentRouter.put('/:id',commentController.updateComment);


export default commentRouter;