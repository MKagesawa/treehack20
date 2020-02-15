import React from "react";
import Button from "@material-ui/core/Button";

class DonorSend extends React.Component {
  state = {
    showShop: false
  };

  getLocation() {}

  toggleShop = () => {
    this.setState({ showShop: true });
  }

  render() {
    let display = (
      <div>
        <h1>Please Upload a Selfie for Verification</h1>
        <Button variant="contained" color="primary">
          Upload
        </Button>
        <h1>Please Upload an ID for Verification</h1>
        <Button variant="contained" color="primary">
          Upload
        </Button>
        <br />
        <br />
        <button onClick={this.getLocation}>Get Your Location</button>
        <br />
        <button onClick={this.toggleShop}>Continue</button>
      </div>
    );


    return display;
  }
}

export default DonorSend;
