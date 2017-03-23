MyModule.controller("ControllerLogin", function($scope,$location,UserFactory){
UserFactory.show(function(result){

  if(result.data == "redirect"){
    $location.url('/')
  }
  if(result.data.Result == "Existing_User"){
    $scope.welcome_back = true
    $scope.new_welcome = false
    $scope.name = result.data.Object.UserName
  }
  else{
    $scope.new_welcome = true
    $scope.welcome_back = false
    $scope.name = result.data.Object.UserName
  }

})//result of the show for the current user
$scope.submit = function(message){
  UserFactory.add_message(message,function(response){
    $scope.message = {}
      $scope.ShowMessage.data.push(response)
  })//waiting on the callback
}//submit
UserFactory.show_message(function(response){
  $scope.ShowMessage = response
})//callback
$scope.submit_comment = function(data,comment){

  UserFactory.add_comment(data,comment, function(response){

    UserFactory.show_comment(function(response){
      $scope.show_comment = response

    })//show comment
  })//add comment to messages
}//scope.comment
UserFactory.show_comment(function(response){
  $scope.show_comment = response
})//show comment


})//ControllerLogin
