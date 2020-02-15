import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import "./App.css";
import RequestMap from './components/RequestMap';
import Donor from './components/Donor';
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div className="content"> 
            <Route exact path="/" component={Home}/>
            <Route path="/requestmap" component={RequestMap} />
            <Route path="/donor" component={Donor} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
