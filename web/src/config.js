  
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDNLB607h5dVH-Zxg19yjABTuAanbB2RdU",
    projectId: "wuhanmap-83035",
    databaseURL: "https://wuhanmap-83035.firebaseio.com/",
};

firebase.initializeApp(config);
export default firebase;