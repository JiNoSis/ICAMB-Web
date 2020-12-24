import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCe-2S87ucN6dWikan09t3vflhHehevODA",
    authDomain: "icamb-85756.firebaseapp.com",
    databaseURL: "https://icamb-85756.firebaseio.com",
    projectId: "icamb-85756",
    storageBucket: "icamb-85756.appspot.com",
    messagingSenderId: "1030073960470",
    appId: "1:1030073960470:web:a38a8c477444d1c5c44d37"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;