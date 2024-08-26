import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

class BookingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      booking: {},
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props;

    axios.get(`/booking/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            booking: res.data.booking,
            isLoading: false
          });
        }
      })
      .catch((err) => {
        this.setState({ error: "Error fetching booking details", isLoading: false });
        console.error("Error fetching booking:", err);
      });
  }

  render() {
    const { bookingId, ticketId, movieId, seatId, userId, showTimeId } = this.state.booking;
    const { isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <div className="card shadow-lg p-4 rounded-3 bg-dark text-light">
          <div className="card-header bg-secondary text-light text-center rounded-3">
            <h4 className="mb-0">Booking Details</h4>
          </div>
          <div className="card-body mt-3">
            <dl className="row">
              <dt className="col-sm-3 fw-bold">Booking ID</dt>
              <dd className="col-sm-9">{bookingId}</dd>

              <dt className="col-sm-3 fw-bold">Ticket ID</dt>
              <dd className="col-sm-9">{ticketId}</dd>

              <dt className="col-sm-3 fw-bold">Movie ID</dt>
              <dd className="col-sm-9">{movieId}</dd>

              <dt className="col-sm-3 fw-bold">Seat ID</dt>
              <dd className="col-sm-9">{seatId}</dd>

              <dt className="col-sm-3 fw-bold">User ID</dt>
              <dd className="col-sm-9">{userId}</dd>

              <dt className="col-sm-3 fw-bold">Show Time ID</dt>
              <dd className="col-sm-9">{showTimeId}</dd>
            </dl>
            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-outline-primary me-2">Edit</button>
              <button className="btn btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function BookingDetailsWithParams() {
  const { id } = useParams();
  return <BookingDetails id={id} />;
}

export default BookingDetailsWithParams;
