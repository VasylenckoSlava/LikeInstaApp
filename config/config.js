import firebase from "firebase";

//APi details alpmail01@gmail.com
const config = {
  apiKey: "AIzaSyC1k-HBwuAuheocLGay_jVqiOR7BmIDT7U",
  authDomain: "testauth-bac32.firebaseapp.com",
  databaseURL: "https://testauth-bac32.firebaseio.com",
  projectId: "testauth-bac32",
  storageBucket: "testauth-bac32.appspot.com",
  messagingSenderId: "247256585771"
};

firebase.initializeApp(config);

 export const f = firebase;
 export const database = firebase.database();
 export const auth = firebase.auth();
 export const storage = firebase.storage();


 // structure of firebase

// Users/userid/  email,name,username,avatar

// Photos/photo-id  author,caption,posted,url

//Comments/photo-id/comment-id  author,posted

