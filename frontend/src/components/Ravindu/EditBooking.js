import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

class EditBooking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Bookings: [],
      bookingId: '',
      ticketId: '',
      movieId: '',
      seatId: '',
      userId: '',
      showTimeId: ''
    };
  }

  componentDidMount() {
    this.retrieveBookings();
  }

  retrieveBookings() {
    axios.get("/Booking").then(res => {
      if (res.data.success) {
        this.setState({
          Bookings: res.data.Bookings
        });

        console.log(this.state.Bookings);
      }
    }).catch(err => {
      console.error("Error retrieving Bookings:", err);
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.params.id;
    const { bookingId, ticketId, movieId, seatId, userId, showTimeId } = this.state;

    const data = {
      bookingId,
      ticketId,
      movieId,
      seatId,
      userId,
      showTimeId
    }
    console.log(data);

    axios.put(`/Booking/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Booking updated successfully");
        this.setState({
          bookingId: '',
          ticketId: '',
          movieId: '',
          seatId: '',
          userId: '',
          showTimeId: ''
        });
        this.props.navigate('/bookingdashboard');
      }
    }).catch((err) => {
      console.error("Error updating Booking:", err);
    });
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 text-light">Update Booking</h1>
        <form className="needs-validation bg-dark p-4 rounded-3 text-light" onSubmit={this.onSubmit}>
          <div className="form-group mb-3">
            <label>Booking ID</label>
            <input
              className="form-control bg-secondary text-light border-0"
              type="text"
              name="bookingId"
              placeholder="Enter booking ID"
              value={this.state.bookingId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Ticket ID</label>
            <input
              className="form-control bg-secondary text-light border-0"
              type="text"
              name="ticketId"
              placeholder="Enter ticket ID"
              value={this.state.ticketId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Movie ID</label>
            <input
              className="form-control bg-secondary text-light border-0"
              type="text"
              name="movieId"
              placeholder="Enter movie ID"
              value={this.state.movieId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Seat ID</label>
            <input
              className="form-control bg-secondary text-light border-0"
              type="text"
              name="seatId"
              placeholder="Enter seat ID"
              value={this.state.seatId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>User ID</label>
            <input
              className="form-control bg-secondary text-light border-0"
              type="text"
              name="userId"
              placeholder="Enter user ID"
              value={this.state.userId}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label>Show Time ID</label>
            <input
              className="form-control bg-secondary text-light border-0"
              type="text"
              name="showTimeId"
              placeholder="Enter show time ID"
              value={this.state.showTimeId}
              onChange={this.handleInputChange}
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
  }
}

const EditBookingWithRouter = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  return <EditBooking {...props} params={params} navigate={navigate} />;
}

export default EditBookingWithRouter;
