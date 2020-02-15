import React from "react";
import { NavLink } from "react-router-dom";

class RequestMap extends React.Component {
  render() {
    return (
      <ul className="header">
        <li>
          <NavLink to="/requestmap">RequestMap</NavLink>
        </li>
        <li>
          <NavLink to="/donor">Contact</NavLink>
        </li>
      </ul>
    );
  }
}

export default RequestMap;
