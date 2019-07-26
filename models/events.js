const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: String,
    gameToBePlayed: String,
    location: String,
    host: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    maxNumberOfPlayers: Number,
    minNumberOfPlayers: Number,
    availableSpots: Number,
    description: String,
    type: String,
    date: Date,
    time: String,
    image: String,
    cost: String,
    rating: Number,
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;