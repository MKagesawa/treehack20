import React from "react";
import styles from "./Recipient.module.css";
import Button from "@material-ui/core/Button";
import Shop from "../Shop/Shop";

class Recipient extends React.Component {
  state = {
    showShop: false,
    latitude: null,
    longitude: null
  };

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

  toggleShop = () => {
    this.setState({ showShop: true });
  };

  render() {
    let display = (
      <div className={styles.Container}>
        <h1>Please Upload a Selfie for Verification</h1>
        <Button className={styles.Upload} variant="contained" color="primary">
          Upload
        </Button>
        <h1>Please Upload an ID for Verification</h1>
        <Button className={styles.Upload} variant="contained" color="primary">
          Upload
        </Button>
        <br />
        <br />
        <button onClick={this.getLocation}>Get Your Location</button>
        <br/>
        {<p>Longitude:{this.state.longitude}  Latitude:{this.state.latitude}</p>}
        <br/>
        <button onClick={this.toggleShop}>Continue</button>
      </div>
    );

    if (this.state.showShop) {
      display = <Shop />;
    }

    return display;
  }
}

export default Recipient;
