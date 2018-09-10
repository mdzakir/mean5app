const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const Post = require('../models/posts');
const config = require('../config/database');

// Register Route
router.post('/create', (req, res, next) => {
  //res.send('REGISTER');
  let newPost = new Post({
    postText: req.body.postText,
    commentsEnabled: req.body.commentsEnabled,
    tags: req.body.tags
  });

  Post.savePost(newPost, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Something went wrong!'});
    } else {
      res.json({success: true, msg: 'Posted Successfully!'});
    }
  });
});

// List of posts Route
router.get('/list', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  /*Post.getPosts( (err, posts) => {
    if(err){
      if(err){
        res.json({success: false, msg: 'Something went wrong!'});
      } else {
        res.send({success: true, list: req.list});
      }
    }
  });*/
  /*console.log(req.list);
  res.send({list: req.list});*/
  Post.find(function(err, posts) {
    res.json(posts);
  });
});

module.exports = router;