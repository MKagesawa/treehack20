import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Confirmation.module.css";
import Button from "@material-ui/core/Button";

class Confirmation extends React.Component {
  render() {
    return (
      <div className={styles.Container}>
        <h3>You received relief supplies from John Smith!</h3>
        <p>Complete the form to report the status of your package. After form submission, you can make another request for relief supplies </p>
        <form>
        <label>
          Package content description:
          <input type="text" name="content_desc" />
        </label>
        <label>
          How many items did you receive?
          <input type="text" name="item_count" />
        </label>
        <input type="submit" value="Submit" href="home" />
      </form>
      </div>
    );
  }
}

export default Confirmation;
