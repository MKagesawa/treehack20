import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import RequestMap from './components/RequestMap/RequestMap';
import Donor from './components/Donor/Donor';
import Home from './components/Home/Home'

class App extends Component {
  render() {
    return (
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/requestmap" component={RequestMap} />
            <Route path="/donor" component={Donor} />
        </div>
    );
  }
}

export default App;
