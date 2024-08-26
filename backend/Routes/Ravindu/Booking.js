const express = require('express');
const Booking = require('../models/Booking'); // Import the Booking model

const router = express.Router();

// Create bookings
router.post('/booking/save', async (req, res) => {
    try {
        let newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(200).json({
            success: "Booking Added Successfully"
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Read bookings
router.get('/booking', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            success: true,
            bookings // List of bookings
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Update bookings
router.put('/booking/update/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );
        if (!updatedBooking) {
            return res.status(404).json({
                error: "Booking not found"
            });
        }
        res.status(200).json({
            success: "Booking Updated Successfully",
            updatedBooking
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

// Delete bookings
router.delete('/booking/delete/:id', async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({
                error: "Booking not found"
            });
        }
        res.status(200).json({
            success: "Booking Deleted Successfully",
            deletedBooking
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});


module.exports = router;