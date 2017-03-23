
var mongoose = require('mongoose')
var Login = mongoose.model('Login')
var Message = mongoose.model('Message')
var Comments = mongoose.model('Comments')
module.exports = {

add: function(req,res){
    Response_User = {}

    function isAlphaNumeric(str) {
      var code, i, len;
    if(!req.body.name){
      res.json('Please Enter Info and not try to break my code')
    }
      for (i = 0, len = str.length; i < len; i++) {
        code = str.charCodeAt(i);

        if (!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 94 && code < 123)) { // lower alpha (a-z)
          return false;
        }
      }
      return true;
    };
    if (isAlphaNumeric(req.body.name)){
Login.findOne({UserName: new RegExp('^'+req.body.name+'$', "i")}, function(err,user){

  if(!user){

    Login.create({UserName:req.body.name}, function(err,user){
      if(err){

        res.json(err)
      }
      else{
        req.session.user = user
        req.session.save()
      Response_User.Result = "New_User"
      Response_User.Object = req.session.user
        res.json(Response_User)
      }
    })//create
  }//if user is currently not in the system
  else{
    req.session.user = user
    req.session.save()
    Response_User.Result = "Existing_User"
    Response_User.Object = req.session.user
    res.json(Response_User)
  }
})//Login Find
}//if alphanumeric
else{
  res.json('Needs to be alphanumeric')
}
  },//add
show: function(req,res){
  if(Response_User.Object){
  res.json(Response_User)
}//if there is a response show, if no redirect to start
else{
  res.json('redirect')
}
},
logoff: function(req,res){
  console.log('got to the logoff')

  req.session.destroy();
  Response_User = {}

  res.redirect('/')
},
add_message: function(req,res){
  //find the user of the post
console.log(req.body)
  Login.findOne({_id:req.session.user._id}, function(err,user){
    //Message is the []
    var message = new Message({Message: req.body.info, _User:req.session.user._id})
    //adding the message to the many
    user.Message.push(message)
    message.save(function(err){
      user.save(function(err){
        if(err) {console.log('error')}
        res.json(message)
      })
    })


  })//should find this user

},//add message
show_messages: function(req,res){
  Message.find({})
  .populate('_User')
  .populate('Comments')
  .exec(function(err,post){
    res.json(post)
  })

    //return an object with all the posts from users in them
  // })//message populate

}, //show messages
add_comment: function(req,res){

Message.findOne({_id: req.body.message}, function(err,message){
  Login.findOne({_id:req.session.user._id}, function(err,user){

    //create a new comment

    comment = new Comments({Comments:req.body.comment, _User:req.session.user._id})
    comment._Message = req.body.message
    // user.Comments.push(comment)
    message.Comments.push(comment)

    user.save(function(err){
      message.save(function(err){
        comment.save(function(err){

          if(err) {console.log('error')}
          console.log(comment, 'comment')
          res.json(comment)

        })//comment save
      })//message save
    })//user save
  })//user find one
})// message find one

},// add comment function

show_comment: function(req,res){
  Comments.find({})
  .populate('_User')
  .exec(function(err,post){
    console.log(post)
    res.json(post)
  })
}
}
