const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');

// Express app
const app = express()

//import routes 
const BookingRoutes = require('./Routes/Ravidu/Booking');

app.use(bodyParser.json());
app.use(cors());

//routes middleware
app.use(BookingRoutes);
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
const PORT = 8000;
const DB_URL = 'mongodb+srv://TBMS:TBMS@tbms.sac1w.mongodb.net/';

mongoose.connect(DB_URL)
.then(() =>{
    console.log('DB connected')
})
.catch((err) => console.log('DB connection error',err));

app.listen(PORT, () => {
    console.log(`app is running on ${PORT}!`)
})
