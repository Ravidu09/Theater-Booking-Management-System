import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // Ensure this has a default export
import CreateBooking from './components/Ravindu/CreateBooking'; // Ensure this has a default export
import EditBooking from './components/Ravindu/EditBooking'; // Ensure this has a default export
import BookingDetailsWithParams from './components/Ravindu/BookingDetails'; // Ensure this has a default export
import Navbar from './components/Navbar'; // Ensure this has a default export
import BookingDashboard from './components/Ravindu/BookingDashboard'; // Ensure this has a default export


export default class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Bookingdashboard" element={<BookingDashboard />} />
            <Route path="/CreateBooking" element={<CreateBooking />} />
            <Route path="/BookingEdit/:id" element={<EditBooking />} />
            <Route path="/BookingPost/:id" element={<BookingDetailsWithParams />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#212529"; // Darker shade with a hint of blue
}


}
