import React from 'react';
import styles from './RequestMap.module.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from './PrimarySearchAppBar';
import DonationCard from './DonationCard';


const mapStyles = {
  width: '100%',
  height: '92%'
};

const API_KEY = process.env.REACT_APP_API_KEY;

class RequestMap extends React.Component {
    static defaultProps = {
      center: {lat:37.433750, lng: -122.172150},
      reqOnePos: {lat:37.433750, lng: -122.19},
      zoom: 11,
    };

    // Marker Properties and Function
    state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      showDonationConfirmation: false
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

    onAddDonationClick = () => 
      this.setState({
        showDonationConfirmation: true
      });

    onDonationClose = props => {
        if (this.state.showDonationConfirmation) {
          this.setState({
            showingInfoWindow: false,
          });
        }
      };

    render() {
      return (
        <div>
          <PrimarySearchAppBar/>
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
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <p>{this.state.selectedPlace.description}</p>
              <Button
                onClick={this.onAddDonationClick}
                href="donorsend"
              >
                Add Donatation
              </Button>
            </div>
          </InfoWindow>
        </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(RequestMap);
