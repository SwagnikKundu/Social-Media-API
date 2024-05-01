import PostModel from "../post/post.model.js";
import { ApplicationError } from '../../error-handler/applicationError.js';

let likeId=1;

export default class LikeModel{
    constructor(postId, userId, id){
        this.postId = postId;
        this.userId = userId;
        this.id = id;
    }

    

    static toggle(postId, userId) {
        const post = PostModel.get(postId);
        if(!post)
            return new ApplicationError('Post not Found',404);
        if(post.status=='published'){
            const index = likes.findIndex((i)=> i.postId == postId  && i.userId == userId);
            if(index == -1){
                const id = ++likeId;
                const likeItem = new LikeModel(postId,userId,id);
                likes.push(likeItem);
                return 'Liked';
            }
            likes.splice(index, 1);
            return 'Unliked';
        }
        return new ApplicationError('Restricted Access',403);
    }

    static get(postId){
        const post = PostModel.get(postId);
        if(!post)
            return new ApplicationError('Post not Found',404);
        if(post.status=='published'){
            const like = likes.filter((c)=>c.postId==postId);
            return like;
        }
        return new ApplicationError('Restricted Access',403);
    }
}

let likes = [new LikeModel(1,1,1)];

