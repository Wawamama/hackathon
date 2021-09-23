var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

var userModel = require('../models/users')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.email
  })
  
  if(!searchUser){
    var newUser = new userModel({
      name: req.body.name,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.name,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
    res.redirect('/signin')
  } else {
    res.redirect('/index')
  }
  
})

// router.post('/sign-in', async function(req,res,next){

//   var searchUser = await userModel.findOne({
//     email: req.body.email,
//     password: req.body.password
//   })

//   if(searchUser!= null){
//     req.session.user = {
//       name: searchUser.name,
//       id: searchUser._id
//     }
//     res.redirect('/journey')
//   } else {
//     res.render('login')
//   }

  
// })

// router.get('/logout', function(req,res,next){

//   req.session.user = null;

//   res.redirect('/index')
// })

module.exports = router;
