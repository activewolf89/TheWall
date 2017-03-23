MyModule.factory('UserFactory',function($http){
factory = {}
comment_object = {}
factory.log_user = function(user, callback){
$http.post('/post', user)
.then(function(response){
  callback(response)
})//response

},//add user
factory.show = function(callback){
  $http.get('/get')
  .then(function(response){
    callback(response)
  })//response with user in session
},//show
factory.add_message = function(message,callback){
  $http.post('/message', message)
  .then(function(response){
    callback(response.data)
  })//post message
},
factory.show_message = function(callback){
  $http.get('/showmessage')
  .then(function(respond){
    callback(respond)
  })
},
factory.add_comment = function(data,comment,callback){
  comment_object.message = data._id
  comment_object.user = data._User._id
  comment_object.comment = comment
  $http.post('/addcomment',comment_object)
  .then(function(response){
    callback(response.data)
  })
}//post
factory.show_comment = function(callback){
  $http.get('/showcomment')
  .then(function(response){
    callback(response)
  })//get show comment
}
return factory
})//factory
