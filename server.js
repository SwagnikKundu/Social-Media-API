// Imports tagged here
import express from 'express';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import jwtAuth from './src/middleware/jwt.middleware.js';
import postRouter from './src/features/post/post.routes.js';
import userRouter from './src/features/user/user.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import apiDocs from './swagger.json' assert {type: 'json'};
import loggerMiddleware from './src/middleware/logger.middleware.js';

const port=8080;
const server= express();

server.use(cors());

server.use(express.json());
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));


server.use(loggerMiddleware);

server.use('/api/posts',jwtAuth, postRouter);
server.use('/api/comments',jwtAuth, commentRouter);
server.use('/api/likes',jwtAuth, likeRouter);
server.use('/api', userRouter);



// Middleware to handle 404 requests.
server.use((req, res)=>{
    res.status(404).send(`API not found. Please check our documentation for more information at localhost:${port}/api-docs`)});

  
// Specify port.
server.listen(port);
  
console.log(`Server is running at ${port}`);