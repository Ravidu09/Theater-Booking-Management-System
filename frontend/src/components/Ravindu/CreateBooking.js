import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBooking = () => {
  const [bookingId, setBookingId] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [movieId, setMovieId] = useState("");
  const [seatId, setSeatId] = useState("");
  const [userId, setUserId] = useState("");
  const [showTimeId, setShowTimeId] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'bookingId':
        setBookingId(value);
        break;
      case 'ticketId':
        setTicketId(value);
        break;
      case 'movieId':
        setMovieId(value);
        break;
      case 'seatId':
        setSeatId(value);
        break;
      case 'userId':
        setUserId(value);
        break;
      case 'showTimeId':
        setShowTimeId(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      bookingId,
      ticketId,
      movieId,
      seatId,
      userId,
      showTimeId,
    };

    console.log(data);

    axios.post("/booking/save", data)
      .then((res) => {
        if (res.data.success) {
          setBookingId("");
          setTicketId("");
          setMovieId("");
          setSeatId("");
          setUserId("");
          setShowTimeId("");
          navigate('/cusdashboard');
        }
      })
      .catch((err) => {
        console.error("Error saving Booking:", err);
      });
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 text-light">Create New Booking</h1>
      <form className="needs-validation bg-dark p-4 rounded-3 text-light" onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Booking ID</label>
          <input
            className="form-control bg-secondary text-light border-0"
            type="text"
            name="bookingId"
            placeholder="Enter booking ID"
            value={bookingId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Ticket ID</label>
          <input
            className="form-control bg-secondary text-light border-0"
            type="text"
            name="ticketId"
            placeholder="Enter ticket ID"
            value={ticketId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Movie ID</label>
          <input
            className="form-control bg-secondary text-light border-0"
            type="text"
            name="movieId"
            placeholder="Enter movie ID"
            value={movieId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Seat ID</label>
          <input
            className="form-control bg-secondary text-light border-0"
            type="text"
            name="seatId"
            placeholder="Enter seat ID"
            value={seatId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>User ID</label>
          <input
            className="form-control bg-secondary text-light border-0"
            type="text"
            name="userId"
            placeholder="Enter user ID"
            value={userId}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Show Time ID</label>
          <input
            className="form-control bg-secondary text-light border-0"
            type="text"
            name="showTimeId"
            placeholder="Enter show time ID"
            value={showTimeId}
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn-success me-2" type="submit">
          <i className="far fa-check-square"></i> &nbsp; Save
        </button>
        <a className="btn btn-warning" href={`/cusdashboard`}>
          <i className="fas fa-edit"></i> &nbsp;Cancel
        </a>
      </form>
    </div>
  );
};

export default CreateBooking;
