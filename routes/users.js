var express = require('express');
var router = express.Router();
var userModel = require('../models/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});







router.post('/login', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront,
    password: req.body.passwordFromFront
  })

  if(searchUser!= null){
    req.session.user = {
      name: searchUser.name,
      id: searchUser._id
    }
    res.redirect('/homePage')
  } else {
    res.render('login')
  }

  
})


router.post('/inscription', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.emailFromFront
  })
  
  if(!searchUser){
    var newUser = new userModel({
      name: req.body.nameFromFront,
      email: req.body.emailFromFront,
      password: req.body.passwordFromFront,
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      name: newUserSave.name,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
    res.redirect('/homePage')
  } else {
    res.redirect('/')
  }
  
})

module.exports = router;