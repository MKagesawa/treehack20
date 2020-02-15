import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css'
import Button from "@material-ui/core/Button";

class RequestMap extends React.Component {
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
          Recipient
        </Button>
        <div className={styles.Spacer} />
        <Button
          className={styles.Donor}
          variant="contained"
          color="primary"
          href="donor"
        >
          Donor
        </Button>
        <div className={styles.Spacer} />
      </div>
    );
  }
}

export default RequestMap;
