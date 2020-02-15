import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import RequestMap from './components/RequestMap/RequestMap';
import Recipient from './components/Recipient/Recipient';
import Home from './components/Home/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" exact component={Home} />
        <Route path="/requestmap" exact component={RequestMap} />
        <Route path="/recipient" exact component={Recipient} />
      </div>
    );
  }
}

export default App;
