var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MessageRegSchema= new mongoose.Schema({
  Message: {type: String, required: true},
  _User: {type: Schema.Types.ObjectId, ref: "Login"},
  Comments: [{type:Schema.Types.ObjectId, ref: "Comments"}]
 },{timestamps: true});


 var Message = mongoose.model('Message', MessageRegSchema);
