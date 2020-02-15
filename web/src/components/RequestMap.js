import React from 'react';
import '../App.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const API_KEY = process.env.REACT_APP_API_KEY;

class RequestMap extends React.Component {
    render() {
      return (
        <Map
          google={this.props.google}
          zoom={11}
          style={mapStyles}
          initialCenter={{ lat: 37.433750, lng: -122.172150}}
        />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(RequestMap);
