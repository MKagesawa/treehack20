import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Confirmation.module.css";
import Button from "@material-ui/core/Button";
import axios from 'axios'

class Confirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      code: window.location.href.split('?')[1].split('=')[1]
    });
  }
//http://localhost:3000/4shPJ2f?Code=-M0C4XnIg9fpezA_4deB
  handleSubmit(event){
    var payload = {};
    payload[this.state.code] = {unfullfilled: false};
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
      <div className={styles.Container}>
        <h3>You received relief supplies from John Smith!</h3>
        <p>Complete the form to report the status of your package. After form submission, you can make another request for relief supplies </p>
        <form onSubmit={this.handleSubmit}>
        <label>
          Code
          <input type="text" name="Code" />
        </label>
        <label>
          Package content description:
          <input type="text" name="content_desc" />
        </label>
        <label>
          How many items did you receive?
          <input type="text" name="item_count" />
        </label>
        <input type="submit" value="Submit" href="home" />
      </form>
      </div>
    );
  }
}

export default Confirmation;
