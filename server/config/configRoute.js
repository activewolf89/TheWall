var controllerRoute = require('./../controller/controllerRoute.js')
console.log('configRoute')
module.exports = function(app){
  app.post('/post', function(req,res){
    controllerRoute.add(req,res)

  })//post
  app.get('/get', function(req,res){
    controllerRoute.show(req,res)
  })//get session back
  app.get('/logout', function(req,res){
    controllerRoute.logoff(req,res)
  })//log out
  app.post('/message', function(req,res){
    controllerRoute.add_message(req,res)
  })//post message
  app.get('/showmessage', function(req,res){
    controllerRoute.show_messages(req,res)
  })//show all messages
  app.post('/addcomment', function(req,res){
    controllerRoute.add_comment(req,res)
  })//add a post to comments
  app.get('/showcomment', function(req, res){
    controllerRoute.show_comment(req,res)
  })//show all comments from all messages
}
