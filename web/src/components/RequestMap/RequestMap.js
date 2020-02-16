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
    donationPoints: []
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

  static defaultProps = {
    center: { lat: 30.5928, lng: 114.3055 },
    reqOnePos: { lat: 37.43375, lng: -122.19 },
    zoom: 11
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

  // spawnDonationPins = () => {
  //   let pins = [];
  //   for (const donation in this.state.donationPoints) {
  //     pins.push(
  //       <Marker
  //         position={this.state.donationPoints[donation].coord}
  //         onClick={this.onMarkerClick}
  //         name={'Request'}
  //         description={this.state.donationPoints[donation].description}
  //       />
  //     );
  //   }
  //   // this.setState({...this.state, pins: pins});
  //   return pins
  // }

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
