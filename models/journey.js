const mongoose = require('mongoose');

var journeySchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });
  

  
 

module.exports = mongoose.model('journey', journeySchema);
