import React, { Component } from 'react';
import axios from 'axios';

export default class ViewBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: [],
      searchQuery: '',
      filteredBookings: []
    };
  }

  componentDidMount() {
    this.retrieveBookings();
  }

  retrieveBookings() {
    axios.get("/booking").then(res => {
      if (res.data.success) {
        this.setState({
          bookings: res.data.bookings,
          filteredBookings: res.data.bookings
        });

        console.log(this.state.bookings);
      }
    }).catch(err => {
      console.error("Error retrieving bookings:", err);
    });
  }

  onDelete = (id) => {
    axios.delete(`/booking/delete/${id}`).then(res => {
      alert("Deleted successfully");
      this.retrieveBookings();
    }).catch(err => {
      console.error("Error deleting booking:", err);
    });
  }

  handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    this.setState({
      searchQuery: query,
      filteredBookings: this.state.bookings.filter(booking =>
        booking.bookingId.toLowerCase().includes(query) ||
        booking.ticketId.toLowerCase().includes(query) ||
        booking.movieId.toLowerCase().includes(query) ||
        booking.userId.toLowerCase().includes(query) ||
        booking.showTimeId.toLowerCase().includes(query)
      )
    });
  };

  render() {
    return (
      <div className="container mt-5">
        <h2 className="text-light mb-4">All Bookings</h2>
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by booking ID, ticket ID, movie ID, user ID, or show time ID"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </div>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Booking ID</th>
                <th scope="col">Ticket ID</th>
                <th scope="col">Movie ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Show Time ID</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredBookings.length > 0 ? (
                this.state.filteredBookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <a href={`/booking/${booking._id}`} className="text-light text-decoration-none">
                        {booking.bookingId}
                      </a>
                    </td>
                    <td>{booking.ticketId}</td>
                    <td>{booking.movieId}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.showTimeId}</td>
                    <td>
                      <a className="btn btn-outline-warning text-warning me-2" href={`/bookingedit/${booking._id}`}>
                        <i className="fas fa-edit"></i> &nbsp;Edit
                      </a>
                      <button className="btn btn-outline-danger" onClick={() => this.onDelete(booking._id)}>
                        <i className="far fa-trash-alt"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <a href="/cusadd" className="btn btn-outline-success text-white">
            <i className="fas fa-plus"></i> &nbsp;Add New Booking
          </a>
        </div>
      </div>
    );
  }
}
