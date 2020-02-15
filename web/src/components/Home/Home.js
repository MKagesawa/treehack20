import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css'
import Button from "@material-ui/core/Button";

class Home extends React.Component {
  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.Spacer} />
        <Button
          className={styles.RequestMap}
          variant="contained"
          color="primary"
          href="requestmap"
        >
          Donor
        </Button>
        <div className={styles.Spacer} />
        <Button
          className={styles.Recipient}
          variant="contained"
          color="primary"
          href="recipient"
        >
          Recipient
        </Button>
        <div className={styles.Spacer} />
      </div>
    );
  }
}

export default Home;
