import LikeModel from "./like.model.js";

export default class LikeController {
    getLikes(req,res){
        const postId=req.params.postId;
        const likes = LikeModel.get(postId);
        console.log(likes);
        if(likes.length>0)
            return res.status(200).send(likes);
        else
            return res.status(404).send('No Likes Found'); 
    }

    toggleLikes(req,res){
        const postId = req.params.postId;
        const userId = req.userId;
        const like = LikeModel.toggle(postId,userId);
        res.status(200).send(like);
    }
}
