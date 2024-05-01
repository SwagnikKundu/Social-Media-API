import PostModel from "./post.model.js";
import LikeModel from "../like/like.model.js";
import CommentModel from "../comment/comment.model.js";

export default class PostController {
    addPost(req, res) {
        const {caption} =req.body;
        if (!caption) {
            return res.status(400).send("Caption is required for adding posts.");
        }
        const userId = req.userId;
        let status = req.query.status;
        if(!status)
            status ='published';
        const newPost = {
          userId:userId,
          caption:caption,
          imageUrl: req.file.filename,
          status:status
        };
        const createdRecord = PostModel.add(newPost);
        res.status(201).send(createdRecord);
    }
    
    getAllPosts(req, res) {
        const { page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const userId = req.userId;

        const posts = PostModel.getAll(userId);
        const totalPosts = posts.length;

        if (totalPosts === 0) {
            return res.status(404).send('Post not Found');
        }

        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedPosts = posts.slice(startIndex, endIndex);
        res.status(200).send(paginatedPosts);
    }

    getPost(req,res){
        const id=req.params.id;
        const post = PostModel.get(id);
        if(post)
            res.status(200).send(post);
        else
            res.status(404).send('Post not Found');
    }

    getUserPosts(req, res) {
        const userId = req.userId;
        const { page, limit } = req.query;
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
    
        const userPosts = PostModel.getPosts(userId);
        const totalPosts = userPosts.length;
    
        if (totalPosts === 0) {
            return res.status(404).send('Post not Found');
        }
    
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedPosts = userPosts.slice(startIndex, endIndex);
    
        res.status(200).send(paginatedPosts);
    }
    

    deletePost(req, res){
        const userId = req.userId;
        const id = req.params.id;
        const error = PostModel.delete(userId,id);
        if (error) {
            return res.status(404).send(error);
        }
        return res.status(201).send('Post deleted successfully');
    }

    updatePost(req,res){
        const id=req.params.id;
        const {caption, status} = req.body;
        const userId = req.userId;
        const newPost = {
          userId:userId,
          caption:caption,
          imageUrl: req.file.filename,
          status: status
        };
        const msg = PostModel.update(userId,id,newPost);
        
        if(msg=='update'){
            const post = PostModel.get(id);
            return res.status(200).send(post);
        }
        else{
            const post = PostModel.get(msg);
            res.status(201).send(post);
        }
    }

    filterPost(req,res){
        const { caption } = req.query;
        if (!caption) {
            return res.status(400).send("Caption is required for filtering posts.");
        }
        const post = PostModel.filter(caption);
        if(post.length>0)
            return res.status(200).send(post);
        else
            res.status(404).send('No Posts Found');
    }


    getAllSortedPosts(req,res){
        const userId =req.userId;
        const posts = PostModel.getAll(userId);
        const { sortBy, order } = req.query;
        let sortedPosts = [...posts];
        if (sortBy === 'engagement') {
            sortedPosts.sort((a, b) => {
                const aLike = LikeModel.get(a.id);
                const bLike = LikeModel.get(b.id);
                const aComment = CommentModel.get(a.id);
                const bComment = CommentModel.get(b.id);
                const engagementA = aLike.length + aComment.length;
                const engagementB = bLike.length + bComment.length;
                return order === 'desc' ? engagementB - engagementA : engagementA - engagementB;
            });
        } else if (sortBy === 'date') {
            sortedPosts.sort((a, b) => order === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt);
        }
        
        res.status(200).send(sortedPosts);
    }
}