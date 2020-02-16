import styles from "./DonorSend.module.css";
import React from "react";
import Button from "@material-ui/core/Button";

import DonationCard from '../DonorSend/DonationCard';
import qr from '../../assets/img/scan_qr.png';
import Pdf from '../DonorSend/QRCode.pdf';


class DonorSend extends React.Component {
  state = {
    showShop: false
  };

  render() {
    return (
      <div>
      <div>
      <h3 className={styles.topHeading}>Thanks for choosing to donate your own packages.</h3>

      <p className={styles.topSubheading}>We’re here to provide assurance and quality insight in where your packages are going. For tracking, you will need to print out a unique, security generated one-time QR code and visibly attach it to your packages.</p>
      
      <div className={styles.QRCodeWrapper}>
      <img src={qr} alt={"QR Code"} className={styles.QRCode}/> 
      </div>

      <div className={styles.QRLinkWrapper}>
      <a href={Pdf} target="_blank" className={styles.QRLink}>Print QR code</a>
      </div>

      <p className={styles.subheading}>How does it work?</p>

      <DonationCard/>
      </div>

      <div className={styles.stickyFooter}>
      <div>
        <Button 
        className={styles.primaryGreenButton}
        variant="contained"
        color="primary"
        href="donor"
        >
        Next
        </Button>
      </div>
      </div>

      </div>
      )}
  }

  export default DonorSend;
