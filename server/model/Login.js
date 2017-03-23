var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LoginRegSchema= new mongoose.Schema({
  UserName: {type: String,required: [true, "UserName is required"],minlength: [2, "UserName has to be more than the min of 2 length"],maxlength:[20, "UserName has to be less than a max length of 20"],trim: true},
  Message: [{type: Schema.Types.ObjectId, ref: "Message"}],
  Comments: [{type: Schema.Types.ObjectId, ref: "Comments"}],


 },{timestamps: true});


 var Login = mongoose.model('Login', LoginRegSchema);
