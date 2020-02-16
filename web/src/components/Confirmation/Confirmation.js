import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Confirmation.module.css";
import Button from "@material-ui/core/Button";
import axios from 'axios'

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:"",
      description:"",
      coord:"",
    };
    this.handleDChange = this.handleDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDChange(event) {
    this.setState({description: event.target.value});
  }

  componentDidMount(){
    axios.get(`https://wuhanmap-83035.firebaseio.com/donation_requests.json`)
        .then(res => {
          const coord = res.data[this.state.code].coord;
          this.setState( {coord});
        })
    this.setState({
      code: window.location.href.split('?')[1].split('=')[1]
    })
  }
//http://localhost:3000/4shPJ2f?Code=-M0C4XnIg9fpezA_4deB
  handleSubmit(event){
    var payload = {};
    payload[this.state.code] = {unfulfilled: false, title: "Package Received!", description: this.state.description, coord: this.state.coord};
    console.log(payload);
    axios.patch(`https://wuhanmap-83035.firebaseio.com/donation_requests.json`, 
      payload
    )
    .then((response) => {
          console.log(response);
    });
    event.preventDefault();
  }

  render() {
    console.log(this.state.code);
    return (
      <div className={styles.all}>
        <h3 className={styles.topHeading}>Thanks for scanning the QR Code. You've received relief supplies!</h3>
        <p className={styles.topSubheading}>Complete the form to report the status of your package. After form submission, you can make another request for relief supplies </p>
        <form onSubmit={this.handleSubmit}>
        <label classname={styles.description}>
          Package content description:
          <textarea type="text" name="content_desc" value={this.state.description}  onChange={this.handleDChange} className={styles.textfieldStyling}/>
        </label>
        <input type="submit" value="Submit" href="home" classname={styles.submitButton}/>
      </form>
      </div>
    );
  }
}

export default Confirmation;
