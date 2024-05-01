// 1. Import express.
import express from 'express';
import PostController from './post.controller.js';
import { upload } from '../../middleware/fileupload.middleware.js';

// 2. Initialize Express router.
const postRouter = express.Router();

const postController = new PostController();

postRouter.get('/all',postController.getAllPosts);
postRouter.get('/sort/all',postController.getAllSortedPosts);
postRouter.get('/:id',postController.getPost);
postRouter.get('/filter',postController.filterPost);
postRouter.get('/',postController.getUserPosts);
postRouter.post('/',upload.single('imageUrl'),postController.addPost);
postRouter.delete('/:id',postController.deletePost);
postRouter.put('/:id',upload.single('imageUrl'),postController.updatePost);


export default postRouter;