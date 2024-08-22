const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  wins: {
    type: Number,
    required: true
  },
  losses: {
    type: Number,
    required: true
  },
  imageUrl: {

    type:String,
    required: true
  }
});


const Team = mongoose.model('Team', teamSchema);


module.exports = Team;