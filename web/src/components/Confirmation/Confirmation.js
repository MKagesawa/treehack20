import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Confirmation.module.css";
import Button from "@material-ui/core/Button";

class Confirmation extends React.Component {
  render() {
    return (
      <div className={styles.Container}>
          <h1>Confirmation Page</h1>
      </div>
    );
  }
}

export default Confirmation;
