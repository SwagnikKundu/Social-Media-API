

let postId=3;

export default class PostModel {
    constructor(
      id,
      userId,
      caption,
      imageUrl,
      status,
      createdAt
    ) {
      this.id = id;
      this.userId = userId;
      this.caption = caption;
      this.imageUrl = imageUrl;
      this.status = status;
      this.createdAt = createdAt;
    }


    static add(post) {
        post.id = ++postId;
        post.createdAt = new Date();
        posts.push(post);
        return post;
    }

    static get(id) {
        const post = posts.find(
          (i) => i.id == id && i.status == 'published'
        );
        return post;
    }

    static getPosts(userId){
        const post = posts.filter(p => p.userId == userId);
        return post;
    }

    static getAll(userId) {
      const post = posts.filter(
        (i) => i.status == 'published' || i.userId == userId
      );
      return post;
    }
    
    static delete(userId,id){
      //console.log(userId,id);
      const postIndex = posts.findIndex(
        (i)=> i.id == id && i.userId == userId);
        if(postIndex == -1){
          return "Post not found";
        } else {
          posts.splice(postIndex, 1);
        }
    }

    static update(userId,id,post){
      const postIndex = posts.findIndex((i)=> i.id == id  && i.userId == userId);
      if(postIndex == -1){
        post.id = ++postId;
        posts.push(post);
        return id;
      }
      if(post.caption)
        posts[postIndex].caption = post.caption;
      if(post.imageUrl)
        posts[postIndex].imageUrl = post.imageUrl;
      if(post.status)
        posts[postIndex].status = post.status;
      return 'update';
    }

    static filter(caption){
      const filteredPosts = posts.filter(post => post.caption.includes(caption));
    }


}

let posts = [
  new PostModel(1,1,'Admin first Post for testing','https://m.media-amazon.com/images/I/61voD8g2mdL._SX679_.jpg','published', new Date()),
  new PostModel(2,1,'Admin first Post for testing','https://m.media-amazon.com/images/I/61voD8g2mdL._SX679_.jpg','drafted', new Date()),
  new PostModel(3,1,'Admin first Post for testing','https://m.media-amazon.com/images/I/61voD8g2mdL._SX679_.jpg','archived', new Date()),
];