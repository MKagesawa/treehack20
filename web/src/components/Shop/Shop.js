import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Shop.module.css";
import Button from "@material-ui/core/Button";
import axios from 'axios'

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      syringe_count:"",
      facemask_count:"",
      medicine_count:"",
      comment:"",
      latitude:"",
      longitude:"",
    };

    this.handleTChange = this.handleTChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleMChange = this.handleMChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.getLocation();
  }

  setPosition = position => {
    this.setState({
      ...this.state,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    }
  };

  handleSubmit(event) {
    axios.post(`https://wuhanmap-83035.firebaseio.com/donation_requests.json`, {
      title: this.state.title,
      coord: {"lat":this.state.latitude, "lng": this.state.longitude},
      description: this.state.comment,
      syringe_count: this.state.syringe_count,
      facemask_count: this.state.facemask_count,
      medicine_count: this.state.medicine_count,
      date: "2020-02-14",
      unfulfilled: true
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  handleTChange(event) {
    this.setState({title: event.target.value});
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
  handleCChange(event) {
    this.setState({comment: event.target.value});
  }

  render() {
    return (
      <div className={styles.all}>
        <h3 className={styles.topHeading}>Please select aid material to request</h3>
        <p className={styles.topSubheading}>Complete the form to indicate quantity of medical materials you require.</p>
        <form onSubmit={this.handleSubmit}> 
        <label>
        <p className={styles.subheading}>What do you want your request to be called?</p>
          <textarea value={this.state.title} onChange={this.handleTChange}/>
        </label>

        <div className={styles.allListItems}>
        <label>
        <p className={styles.subheading}>Number of Syringes needed:</p>
          <textarea value={this.state.syringe_count} onChange={this.handleSChange}/>
        </label>
        <label className={styles.aListItem}>
        <p className={styles.subheading}>Number of Facemasks needed</p>
          <textarea value={this.state.facemask_count} onChange={this.handleFChange} className={styles.textArea}/>
        </label>
        <label className={styles.aListItem}>
        <p className={styles.subheading}>Number of Medicine needed</p>
          <textarea value={this.state.medicine_count}  onChange={this.handleMChange} className={styles.textArea}/>
        </label>
        </div>

        <label>
        <p className={styles.subheading}>Any additional notes?</p>
          <textarea value={this.state.comment}  onChange={this.handleCChange} />
        </label>
        <div className={styles.stickyFooter}>
        <input type="submit" value="Request these supplies" className={styles.submitButton}/>
        </div>
      </form>
      </div>

// <h3>Please select aid material to request</h3>
// <p>Complete the form to indicate quantity of medical materials you require.</p>
// <form onSubmit={this.handleSubmit}> 
// <label>
//   Title:
//   <textarea value={this.state.title} onChange={this.handleTChange}/>
// </label>
// <label>
//   Syringe Count:
//   <textarea value={this.state.syringe_count} onChange={this.handleSChange}/>
// </label>
// <label>
//   Facemask Count:
//   <textarea value={this.state.facemask_count} onChange={this.handleFChange} />
// </label>
// <label>
//   Medicine Count:
//   <textarea value={this.state.medicine_count}  onChange={this.handleMChange} />
// </label>
// <label>
//   Comment:
//   <textarea value={this.state.comment}  onChange={this.handleCChange} />
// </label>
// <input type="submit" value="Submit"/>
// </form>
    );
  }
}

export default Shop;
