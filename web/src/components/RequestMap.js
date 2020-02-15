import React from 'react';
import '../App.css';
import styles from './RequestMap.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '85%'
};

const API_KEY = process.env.REACT_APP_API_KEY;

class RequestMap extends React.Component {
    static defaultProps = {
      center: {lat:37.433750, lng: -122.172150},
      reqOnePos: {lat:37.433750, lng: -122.19},
      zoom: 11,
    };

    state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    render() {
      return (
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={mapStyles}
          initialCenter={this.props.center}
        >
          <Marker
            position={this.props.reqOnePos}
            onClick={this.onMarkerClick}
            name={'Request 1'}
            description={'Requesting y many item j'}
          />
          <Marker
            position={{lat:37.433750, lng: -122.17}}
            onClick={this.onMarkerClick}
            name={'Request 2'}
            description={'Requesting x many item i'}
          />
          <InfoWindow
            className={styles.InfoBoxWindow}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <p>{this.state.selectedPlace.description}</p>
              <button>Donate</button>
            </div>
          </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(RequestMap);
