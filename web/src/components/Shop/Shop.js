import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Shop.module.css";
import Button from "@material-ui/core/Button";

class Shop extends React.Component {
  render() {
    return (
      <div className={styles.Container}>
        <div className={styles.Spacer} />
        <img
          src={require("../../assets/img/pill.jpeg")}
          className={styles.Item}
        />
        <div className={styles.Spacer} />
        <img
          src={require("../../assets/img/mask.jpg")}
          className={styles.Item}
        />
        <div className={styles.Spacer} />
        <img
          src={require("../../assets/img/needle.jpg")}
          className={styles.Item}
        />
        <div className={styles.Spacer} />
      </div>
    );
  }
}

export default Shop;
