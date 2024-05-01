import PostModel from "../post/post.model.js";
import { ApplicationError } from '../../error-handler/applicationError.js';

let commentId = 1;
export default class CommentModel{
    constructor(postId, userId, comment, id){
        this.postId = postId;
        this.userId = userId;
        this.comment = comment;
        this.id = id;
    }

    static add(postId, userId, comment) {
        const post = PostModel.get(postId);
        if(!post)
            return new ApplicationError('Post not Found',404);
        if(post.status=='published'){
            const commentItem = new CommentModel(postId,userId,comment);
            commentItem.id = ++commentId;
            comments.push(commentItem);
            return commentItem;
        } 

        return new ApplicationError('Restricted Access',403);
    }

    static get(postId){
        const post = PostModel.get(postId);
        if(!post)
            return new ApplicationError('Post not Found',404);
        if(post.status=='published'){
            const comment = comments.filter((c)=>c.postId==postId);
            return comment;
        } 
        
        return new ApplicationError('Restricted Access',403);
    }

    static delete(userId,id){
        const index = comments.findIndex(
            (i)=> i.id == id && i.userId == userId);
            if(index == -1){
                return "Comment not found";
            } else {
                comments.splice(index, 1);
            }
    }

    static update(userId,id,comment){
    const index = comments.findIndex((i)=> i.id == id  && i.userId == userId);
      if(index == -1){
        return false;
      }

      comments[index].comment = comment;
      return comments[index];
    }

}

var comments = [new CommentModel(1,1,'First comment',1)];