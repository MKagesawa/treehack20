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
        <Route exact path="/" component={Home} />
        <Route path="/requestmap" component={RequestMap} />
        <Route path="/recipient" component={Recipient} />
      </div>
    );
  }
}

export default App;
