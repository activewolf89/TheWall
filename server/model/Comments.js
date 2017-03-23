var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CommentsRegSchema= new mongoose.Schema({
  Comments: {type: String, required: true},
  _Message: {type: Schema.Types.ObjectId, ref: "Message"},
  _User:{type: Schema.Types.ObjectId, ref: "Login"}

 },{timestamps: true});


 var Comments = mongoose.model('Comments', CommentsRegSchema);
