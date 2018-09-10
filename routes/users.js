const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../config/database');

// Register Route
router.post('/register', (req, res, next) => {
  //res.send('REGISTER');
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg: 'Failed to register the user'});
    } else {
      res.json({success: true, msg: 'User registered successfully'});
    }
  });
});


// Authenticate Route
router.post('/authenticate', (req, res, next) => {
  //res.send('AUTHENTICATE');
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByName(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found!'});
    }
    console.log(password);
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: 'Bearer ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong Password! '})
      }
    });
  });
});

// Profile Route
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  console.log(req.user);
  res.send({user: req.user});
});

module.exports = router;