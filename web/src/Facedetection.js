const request = require("request");

const subscriptionKey = "7803f96c67734eaf873e35ddd3b1f668";

const uriBaseDetect =
  "https://wuhanmaps.cognitiveservices.azure.com/face/v1.0/detect";

const uriBaseVerify =
  "https://wuhanmaps.cognitiveservices.azure.com/face/v1.0/verify";

const imageUrl =
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg";

const paramsDetect = {
  returnFaceId: "true",
  returnFaceLandmarks: "false",
  // returnFaceAttributes:
  //   "age,gender,headPose,smile,facialHair,glasses," +
  //   "emotion,hair,makeup,occlusion,accessories,blur,exposure,noise"
};

const optionsDetect = {
  uri: uriBaseDetect,
  qs: paramsDetect,
  body: '{"url": ' + '"' + imageUrl + '"}',
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": subscriptionKey
  }
};

request.post(optionsDetect, (error, response, body) => {
  if (error) {
    console.log("Error: ", error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
  console.log("JSON Response\n");
  // console.log(jsonResponse);
  const res = JSON.parse(body);
  console.log(JSON.parse(body)[0].faceId);
  console.log(JSON.parse(body)[1].faceId);
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
  console.log(optionsVerify.body)
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
