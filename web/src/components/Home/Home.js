import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Home.module.css'
import Button from "@material-ui/core/Button";

class Home extends React.Component {
  render() {
    return <React.Fragment>
      <div className={styles.Container} style={{display: "inline-block", textAlign: "center", width: "40%", marginRight: "5%", marginLeft: "5%"}}>
      <h1>The standard Lorem Ipsum passage, used since the 1500s</h1>
      <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
        <Button
          className={styles.RequestMap}
          variant="contained"
          color="primary"
          href="donor"
        >
          Donor
        </Button>
        <Button
          className={styles.Recipient}
          variant="contained"
          color="primary"
          href="recipient"
        >
          Recipient
        </Button>
      </div>
      <div className={styles.Container} style={{display: "inline-block", textAlign: "center", width: "50%"}}>
        <img src="https://ichef.bbci.co.uk/news/208/cpsprodpb/ABDF/production/_110899934_frantic_976-nc.png" style={{width: "100%"}}/>
      </div>
    </React.Fragment>;
  }
}

export default Home;
