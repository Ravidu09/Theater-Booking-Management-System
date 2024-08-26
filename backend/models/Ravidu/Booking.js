const mongoose = require('mongoose');

const bookingschema = new mongoose.Schema({

    bookingId:{
      type:String,
      required:true  
    },

    ticketId:{
        type:String,
        required:true  
    },

    movieId:{
        type:String,
        required:true  
    },

    seatId:{
        type:String,
        required:true  
    },

    userId:{
        type:String,
        required:true  
    },

    showTimeId:{
        type:String,
        required:true  
    }
}

);

module.exports = mongoose.model('Booking',bookingschema);                                                                                                                                           