import React from "react";
import styles from "./Recipient.module.css";
import Button from "@material-ui/core/Button";
import Shop from "../Shop/Shop";
import Webcam from "react-webcam";
const request = require("request");

const AZURE_KEY = require("../../cred");

const subscriptionKey = AZURE_KEY.AZURE_KEY;

const uriBaseDetect =
  "https://wuhanmaps.cognitiveservices.azure.com/face/v1.0/detect";

const uriBaseVerify =
  "https://wuhanmaps.cognitiveservices.azure.com/face/v1.0/verify";

const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg";

const paramsDetect = {
  returnFaceId: "true",
  returnFaceLandmarks: "false"
  // returnFaceAttributes:
  //   "age,gender,headPose,smile,facialHair,glasses," +
  //   "emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
};
const getOptions = image => {
  console.log(image.slice(23));
  return {
    uri: uriBaseDetect,
    qs: paramsDetect,
    body: imm, //'{"url": ' + '"' + atob(image.slice(23)) + '"}',
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Content-Length": image.length
    }
  };
};

const doDetection = image => {
  const optionsDetect = getOptions(image);
  request.post(optionsDetect, (error, response, body) => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    console.log(body);
    console.log('----here')
    let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
    console.log("JSON Response\n");
    // console.log(jsonResponse);

    const res = JSON.parse(body);
    console.log(res)
    // console.log(JSON.parse(body)[0].faceId);
    // console.log(JSON.parse(body)[1].faceId);
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
      console.log(jsonResponse);
      // const res = JSON.parse(body);
    });
  });
};

const videoConstraints = {
  width: 2560,
  height: 1440,
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    doDetection(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
class Recipient extends React.Component {
  state = {
    showShop: false,
    latitude: null,
    longitude: null
  };

  setPosition = position => {
    this.setState({
      ...this.state,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  };

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    }
  };

  toggleShop = () => {
    this.setState({ showShop: true });
  };

  // WebcamCapture = () => {
  //   const webcamRef = React.useRef(null);

  //   const capture = React.useCallback(() => {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //   }, [webcamRef]);

  //   return (
  //     <>
  //       <Webcam
  //         audio={false}
  //         height={720}
  //         ref={webcamRef}
  //         screenshotFormat="image/jpeg"
  //         width={1280}
  //       />
  //       <button onClick={capture}>Capture photo</button>
  //     </>
  //   );
  // };
  // Capture = () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  // };

  render() {
    const coords = this.state.latitude ? (
      <p>
        Longitude:{this.state.longitude} Latitude:{this.state.latitude}
      </p>
    ) : null;

    let display = (
      <div className={styles.Container}>
        <h1>Please Upload a Selfie for Verification</h1>
        <Button className={styles.Upload} variant="contained" color="primary">
          Upload
        </Button>
        <h1>Please Upload an ID for Verification</h1>
        <Button className={styles.Upload} variant="contained" color="primary">
          Upload
        </Button>
        <br />
        <WebcamCapture />
        <br />
        <button onClick={this.getLocation}>Get Your Location</button>
        <br />
        {coords}
        <br />
        <button onClick={this.toggleShop}>Continue</button>
      </div>
    );

    if (this.state.showShop) {
      display = <Shop />;
    }

    return display;
  }
}

export default Recipient;
