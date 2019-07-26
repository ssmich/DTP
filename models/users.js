const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   name: String,
   email: String, 
   password: String,
   contactInfo: String ,
   event: {type:mongoose.Schema.Types.ObjectId, ref:"Event"},
   picture: String,
   playerRating: Number,
   hostRating: Number,
   gamesPlayed: Number,
   bio: String,
   eventPreferences: [{type:String}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;