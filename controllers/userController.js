var userModel = require('../models/users');

exports.signUp = async function(req,res,next){

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
    
      res.redirect('/homepage')
    } else {
      res.redirect('/')
    }
  }

  exports.signIn = async function(req,res,next){
    var searchUser = await userModel.findOne({
      email: req.body.email,
      password: req.body.password
    })
  
    if (searchUser!= null) {
      req.session.user = {
        name: searchUser.name,
        id: searchUser._id
      }
      res.redirect('/homepage')
    } else {
      res.render('/')
    }
  }