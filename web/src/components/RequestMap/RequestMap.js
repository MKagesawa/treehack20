import React from "react";
import styles from "./RequestMap.module.css";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import axios from "axios";

const mapStyles = {
  width: '100%',
  height: '83%'
};

const API_KEY = process.env.REACT_APP_API_KEY;

class RequestMap extends React.Component {
  // Marker Properties and Function
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    donationPoints: [],
    starting_lat: 0,
    starting_lng: 0
  };

  componentDidMount() {
    axios
      .get(`https://wuhanmap-83035.firebaseio.com/donation_requests.json`)
      .then(res => {
        const donationPoints = res.data;
        this.setState({ donationPoints });
        // console.log(this.state.donationPoints);
        console.log(this.state.donationPoints);
      });
  }

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

  setPosition = position => {
    this.setState({
      ...this.state,
      starting_lat: position.coords.latitude,
      starting_lng: position.coords.longitude
    });
    const center = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    return center
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    }
  };

  render() {
    const center = this.getLocation();
    const zoom = 11
    return (
      <div>
        <PrimarySearchAppBar />
        <Map
          google={this.props.google}
          zoom={zoom}
          style={mapStyles}
          initialCenter={center}
        >
          {Object.keys(this.state.donationPoints).map((donation, index) => (
            <Marker
              position={this.state.donationPoints[donation].coord}
              onClick={this.onMarkerClick}
              name={this.state.donationPoints[donation].title}
              code={donation}
              unfulfilled={this.state.donationPoints[donation].unfulfilled}
              syringe_count={this.state.donationPoints[donation].syringe_count}
              facemask_count={
                this.state.donationPoints[donation].facemask_count
              }
              medicine_count={
                this.state.donationPoints[donation].medicine_count
              }
              description={this.state.donationPoints[donation].description}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h2>{this.state.selectedPlace.name}</h2>
              <p>
                <b>{this.state.selectedPlace.description}</b>
              </p>
              <div hidden={!this.state.selectedPlace.unfulfilled}>
                <p>
                  Number of syringe(s) needed:{" "}
                  <b>{this.state.selectedPlace.syringe_count}</b>
                </p>
                <p>
                  Number of facemask(s) needed:{" "}
                  <b>{this.state.selectedPlace.facemask_count}</b>
                </p>
                <p>
                  Amount of medicine needed:{" "}
                  <b>{this.state.selectedPlace.medicine_count}</b>
                </p>
                <div className={styles.Container}>
                  <Button
                    href={"donorsend?code=" + this.state.selectedPlace.code}
                    variant="contained"
                    color="primary"
                  >
                    Add Donation
                  </Button>
                </div>
              </div>
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
