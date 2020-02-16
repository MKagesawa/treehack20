import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Shop.module.css";
import Button from "@material-ui/core/Button";
import axios from 'axios'

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      syringe_count:"",
      facemask_count:"",
      medicine_count:""
    };

    this.handleSChange = this.handleSChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleMChange = this.handleMChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    axios.post(`https://wuhanmap-83035.firebaseio.com/donation_requests.json`, {
      coord: {"lat":37.433350, "lng": -122.19},
      description: this.state.syringe_count,
      date: "2020-02-14"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  handleSChange(event) {
    this.setState({syringe_count: event.target.value});
  }
  handleFChange(event) {
    this.setState({facemask_count: event.target.value});
  }
  handleMChange(event) {
    this.setState({medicine_count: event.target.value});
  }

  render() {
    return (
      <div>
        <h3>Please select aid material to request</h3>
        <p>Complete the form to indicate quantity of medical materials you require.</p>
        <form onSubmit={this.handleSubmit}> 
        <label>
          Syringe Count:
          <textarea value={this.state.syringe_count} onChange={this.handleSChange}/>
        </label>
        <label>
          Facemask Count:
          <textarea value={this.state.facemask_count} onChange={this.handleFChange} />
        </label>
        <label>
          Medicine Count:
          <textarea value={this.state.medicine_count}  onChange={this.handleMChange} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
      </div>
    );
  }
}

export default Shop;
