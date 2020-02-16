import "../../App.css";
import React from "react";
import Button from "@material-ui/core/Button";

import DonationCard from '../DonorSend/DonationCard';
import qr from '../../assets/img/scan_qr.png';


class DonorSend extends React.Component {
  state = {
    showShop: false
  };

  render() {
      return (
      <div>
        <h3>Thanks! Here is your chosen donation...</h3>
        <p>Sending aid to..</p>
        <img src={qr} alt={"QR Code"}/> 
        <DonationCard/>
        <Button 
          variant="contained"
          color="primary"
          href="donor"
        >
          Complete Donation
        </Button>
      </div>

      )}
}

export default DonorSend;
