import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyBVQCwWncgEtYQCwEqtr55wcexAwuERAOQ",
    authDomain: "icamb-8f692.firebaseapp.com",
    databaseURL: "https://icamb-8f692-default-rtdb.firebaseio.com",
    projectId: "icamb-8f692",
    storageBucket: "icamb-8f692.appspot.com",
    messagingSenderId: "645549606709",
    appId: "1:645549606709:web:ebc2071688fe69f8056e7c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;