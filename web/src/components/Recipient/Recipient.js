import React from "react";
import styles from "./Recipient.module.css";
import Button from "@material-ui/core/Button";
import Shop from "../Shop/Shop";
import Webcam from "react-webcam";
import { storage } from "../../config/config";

const request = require("request");

const AZURE_KEY = require("../../cred");

const subscriptionKey = AZURE_KEY.AZURE_KEY;

const uriBaseDetect =
  "https://wuhanmaps.cognitiveservices.azure.com/face/v1.0/detect";

const uriBaseVerify =
  "https://wuhanmaps.cognitiveservices.azure.com/face/v1.0/verify";

const paramsDetect = {
  returnFaceId: "true",
  returnFaceLandmarks: "false"
  // returnFaceAttributes:
  //   "age,gender,headPose,smile,facialHair,glasses," +
  //   "emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
};
const getOptions = url => {
  return {
    uri: uriBaseDetect,
    qs: paramsDetect,
    body: '{"url": ' + '"' + url + '"}',
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": subscriptionKey
    }
  };
};

class Recipient extends React.Component {
  state = {
    showShop: false,
    latitude: null,
    longitude: null,
    image: null,
    url: "",
    progress: 0,
    verified: false
  };
  doDetection = () => {
    const optionsDetect = getOptions(this.state.url);
    request.post(optionsDetect, (error, response, body) => {
      if (error) {
        console.log("Error: ", error);
        return;
      }
      let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
      const res = JSON.parse(body);
      if (JSON.parse(body).length >= 2) {
        const faceId1 = JSON.parse(body)[0].faceId;
        const faceId2 = JSON.parse(body)[1].faceId;
        const optionsVerify = {
          uri: uriBaseVerify,
          // qs: paramsVerify,
          body: '{"faceId1": "' + faceId1 + '","faceId2":"' + faceId2 + '"}',
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey
          }
        };
        console.log(optionsVerify.body);
        request.post(optionsVerify, (error, response, body) => {
          if (error) {
            console.log("Error: ", error);
            return;
          }
          let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
          console.log("JSON Response\n");
          if (JSON.parse(body).isIdentical) {
            this.setState({verified: true});
          } else {
            alert('Not the same Person!!')
          };
        });
      } else {
        alert('Could not detect two faces');
      }
    });
  };

  callback = url => {
    this.setState({ ...this.state, url: url });
  };

  toggleShop = () => {
    this.setState({ showShop: true });
  };

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };

  render() {
    let cont;
    if (this.state.verified) {
      cont = (<button onClick={this.toggleShop}>Continue</button>);
    } else {
      cont = (
        <button onClick={this.toggleShop} disabled={true}>
          Continue
        </button>
      );
    }

    let display = (
      <div className={styles.all}>
        <h3 className={styles.topHeading}>Let's verify your account.</h3>
        <p className={styles.topSubheading}>We typically authenticate accounts that are authorized users within a hospital or health facility.</p>
      <div className={styles.Container}>
        <br />
        <div className="center">
          <div className="file-field input-field">
            <div className="btn">
              <p className={styles.subheading}>1. Upload an image file of you and your photo ID.</p>
              <input type="file" onChange={this.handleChange} />
            </div>
          </div>
          <br />
          <br />
          <button
            onClick={this.handleUpload}
            className="waves-effect waves-light btn"
            className={styles.submitButton}
          >
            Upload my image
          </button>
          <br />
          <br />
          <br />
          <br />
          <p className={styles.subheading}>2. We'll use detection on our end to authenticate your account.</p>
          <img
            src={this.state.url || "https://via.placeholder.com/400x300"}
            alt="Uploaded Images"
            height="300"
            width="400"
          />
          <br />
          <br />
        </div>
        <button onClick={this.doDetection} className={styles.submitButton}>Authenticate my account</button>
        <br />
        {cont}
      </div>
      </div>
    );

    if (this.state.showShop) {
      display = <Shop />;
    }

    return display;
  }
}

export default Recipient;
