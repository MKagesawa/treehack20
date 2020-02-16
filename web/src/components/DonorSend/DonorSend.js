import styles from "./DonorSend.module.css";
import React from "react";
import Button from "@material-ui/core/Button";

import DonationCard from '../DonorSend/DonationCard';
import DonationCardTwo from '../DonorSend/DonationCardTwo';
import DonationCardThree from '../DonorSend/DonationCardThree';
import qr from '../../assets/img/scan_qr.png';
import Pdf from '../DonorSend/QRCode.pdf';
import QRCode from 'qrcode.react'


class DonorSend extends React.Component {
  state = {
    showShop: false,
  };

  render() {
    return (
      <div className={styles.all}>
      <div>
      <h3 className={styles.topHeading}>Thanks for choosing to donate your own packages.</h3>

      <p className={styles.topSubheading}>We’re here to provide assurance and quality insight in where your packages are going. For tracking, you will need to print out a unique, security generated one-time QR code and visibly attach it to your packages.</p>
      
      <div className={styles.QRCodeWrapper}>
      {/* <img src={qr} alt={"QR Code"} className={styles.QRCode}/>  */}
      <QRCode className={styles.QRLinkWrapper} value={"http://wuhanmap.tech/4shPJ2f?" + window.location.href.split('?')[1]} />
      </div>

      <div className={styles.QRLinkWrapper}>
      <a href={Pdf} target="_blank" className={styles.QRLink}>Print QR code</a>
      </div>

      <p className={styles.subheading}>How does it work?</p>

      <div classname={styles.cardsWrapper}>
        <br>
        </br>
      <DonationCard/>
      <br>
        </br>
      <DonationCardTwo/>
      <br>
        </br>
      <DonationCardThree/>
      </div>

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
