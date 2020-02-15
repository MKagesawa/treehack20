import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import RequestMap from './components/RequestMap/RequestMap';
import Recipient from './components/Recipient/Recipient';
import Home from './components/Home/Home'
import Confirmation from './components/Confirmation/Confirmation';

class App extends Component {
  render() {
    return (
      <div>
        <Route path="/4shPJ2f" exact component={Confirmation} />
        <Route exact path="/" exact component={Home} />
        <Route path="/requestmap" exact component={RequestMap} />
        <Route path="/recipient" exact component={Recipient} />
      </div>
    );
  }
}

export default App;
