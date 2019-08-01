const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: {type:String, required:true},
    gameToBePlayed: {type:String, required:true},
    location: {type:String, required:true},
    host: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    minNumberOfPlayers: Number,
    availableSpots: Number,
    description: String,
    type: String,
    date: Date,
    time: String,
    image: String,
    cost: String,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;