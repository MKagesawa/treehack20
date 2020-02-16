import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css'
import Button from "@material-ui/core/Button";

class Home extends React.Component {
  render() {
    return <React.Fragment>
      <div className={styles.all}>
      <div className={styles.Container} style={{display: "inline-block", textAlign: "left", width: "40%", marginRight: "5%", marginLeft: "5%"}}>
      <h1 className={styles.topHeading}>Promise</h1>
      <div>
      <p className={styles.topSubheading}>
        Track your donations and packages to verified hospitals and health centers with security and confidence.
        </p>
      </div>
        <Button
          className={styles.RequestMap}
          variant="contained"
          color="#05B48A"
          href="donor"
        >
          I would like to donate
        </Button>
        <Button
          className={styles.Recipient}
          variant="contained"
          color="primary"
          href="recipient"
        >
          I'm in need of relief supplies
        </Button>
      </div>

      <div className={styles.Container} style={{display: "inline-block", textAlign: "center", width: "50%"}}>
        <img className={styles.imageStyling} src={require('./landing_image.png')} />
      </div>

      </div>
    </React.Fragment>;
  }
}

export default Home;
