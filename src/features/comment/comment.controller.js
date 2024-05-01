import CommentModel from "./comment.model.js";

export default class CommentController {
    getComments(req,res){
        const postId=req.params.id;
        const comments= CommentModel.get(postId);
        if(comments.length > 0)
            res.status(200).send(comments);
        else
            res.status(404).send('No Comments Found');
    }

    addComment(req,res){
        const postId = req.params.id;
        const userId = req.userId;
        const {comment} = req.body;
        const commentItem = CommentModel.add(postId,userId,comment);
        res.status(201).send(commentItem);
    }


    deleteComment(req, res){
        const userId = req.userId;
        const id = req.params.id;
        const error = CommentModel.delete(userId,id);
        if (error) {
            return res.status(404).send(error);
        }
        return res.status(200).send('Comment deleted successfully');
    }

    updateComment(req,res){
        const id=req.params.id;
        const userId = req.userId;
        const {comment} = req.body;
        const msg = CommentModel.update(userId,id,comment);
        if(msg == false)
            return res.status(404).send('Comment not Found');
        res.status(200).send(msg);
    }
}