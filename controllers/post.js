//Models----------------
const Post = require("../models/post");
//Packages----------------
const formidable = require("formidable");
const fs = require("fs");

//Get post by it's Id PARAM--------------------
exports.getPostById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name profile_photo")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Post not Found in DB",
        });
      }
      post.postedBy.profile_photo.data = undefined;
      req.post = post;
      next();
    });
};

//Get Single Post--------------------
exports.getPost = (req, res) => {
  req.post.photo.data = undefined;
  return res.json(req.post);
};

//Create a post--------------------
exports.createPost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem in Image",
      });
    }

    const { title, body } = fields;
    if (!title || !body) {
      res.status(400).json({
        error: "All fields required",
      });
    }

    const post = new Post(fields);

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is tooooo BIG",
        });
      }
      post.photo.data = fs.readFileSync(file.photo.path);
      post.photo.contentType = file.photo.type;
    }

    post.postedBy = req.profile;
    post.save((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to save post in DB",
        });
      }
      res.json(post);
    });
  });
};

//Update a Post--------------------
exports.updatePost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem in Image",
      });
    }

    const { title, body } = fields;
    if (!title || !body) {
      res.status(400).json({
        error: "All fields required",
      });
    }
    
    let post = req.post;

    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is tooooo BIG",
        });
      }
      post.photo.data = fs.readFileSync(file.photo.path);
      post.photo.contentType = file.photo.type;
    }

    post.title = title;
    post.body = body;
    post.postedBy = req.profile;

    if (post.postedBy._id.toString() === req.profile._id.toString()) {
      post.save((err, updatedPost) => {
        if (err) {
          return res.status(400).json({
            error: "Not able to save post in DB",
          });
        }
        res.json(updatedPost);
      });
    } else {
        res.json({
          message: "You are not allowed to Update the post.",
        });
      }
  });
};

//Get MY ALL Post--------------------
exports.getMyPosts = (req, res) => {
  Post.find({ postedBy: req.profile._id })
    .sort("-createdAt")
    .populate("postedBy", "_id name")
    .exec((err, myposts) => {
      if (err) {
        return res.status(400).json({
          error: "Posts not found from DB",
        });
      }
      myposts.map((post) => {
        post.photo.data = undefined;
      });
      res.json({ myposts });
    });
};

//Get Photo of a Post--------------------
exports.getPhoto = (req, res, next) => {
  if (req.post.photo.data) {
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
  }
  next();
};

//Get Post of My Following--------------------
exports.getMyFollowingPosts = (req, res) => {
  Post.find({ postedBy: { $in: req.profile.following } })
    .sort("-createdAt")
    .populate("postedBy", "_id name profile_photo")
    .exec((err, myposts) => {
      if (err) {
        return res.status(400).json({
          error: "Posts not found from DB",
        });
      }
      myposts.map((post) => {
        post.photo.data = undefined;
        post.postedBy.profile_photo.data = undefined;
      });
      res.json({ myposts });
    });
};

//Get All Posts--------------------
exports.getAllPost = (req, res) => {
  Post.find()
    .populate("postedBy", "_id name profile_photo")
    .sort("-createdAt")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "Posts not found from DB",
        });
      }
      posts.map((post) => {
        post.photo.data = undefined;
        post.postedBy.profile_photo.data = undefined;
      });
      res.json({ posts });
    });
};

//Delete a Post--------------------
exports.removePost = (req, res) => {
  const { _id } = req.post;
  Post.findOne({ _id }, (err, post) => {
    if (err || !post) {
      return res.status(400).json({ error: "Post doesn't exists" });
    }
    if (post.postedBy._id.toString() === req.profile._id.toString()) {
      post.remove((err, post) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to delete Post",
          });
        }
        res.json({
          message: `Post Succesfull deleted`,
          post,
        });
      });
    }
  });
};

//like a Post--------------------
exports.likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.profile._id },
    },
    { new: true }
  ).exec((err, like) => {
    if (err) {
      return res.status(422).json({
        error: err,
      });
    } else {
      res.json(like);
    }
  });
};

//UnLike a Post--------------------
exports.unLikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.profile._id },
    },
    { new: true }
  ).exec((err, unlike) => {
    if (err) {
      return res.status(422).json({
        error: err,
      });
    } else {
      res.json(unlike);
    }
  });
};

//Comment on a Post--------------------
exports.commentOnPost = (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.profile.name,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    // .populate("comments.postedBy", "name")
    .exec((err, comment) => {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      }
      res.json(comment);
    });
};