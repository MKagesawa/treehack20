import React from "react";
import styles from "./Recipient.module.css";
import Button from "@material-ui/core/Button";
import Shop from "../Shop/Shop";

class Recipient extends React.Component {
  state = {
    showShop: false
  };

  getLocation() {}

  toggleShop = () => {
    this.setState({ showShop: true });
  }

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
        <br />
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
