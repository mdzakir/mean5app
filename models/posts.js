const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Post Schema
const PostSchema = mongoose.Schema({
  postText: {type: String, required: true},
  commentsEnabled: {type: Boolean, required: true},
  tags: {type: String, required: true}
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.savePost = function (newPost, callback) {
  newPost.save(callback);
};

/*module.exports.getPosts = function (callback) {
  Post.find(callback);
};*/

module.exports.getPostById = function (id, callback) {
  Post.findById(id, callback);
};

module.exports.getPostByName = function (id, callback) {
  const query = {_id: id};
  // Post.findOne(query, callback);
  Post.findOne(query, callback);
};