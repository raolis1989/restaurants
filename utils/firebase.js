
  import firebase from 'firebase/app';
  import 'firebase/firestore';
  
  const firebaseConfig = {
    apiKey: "AIzaSyBFLqp-iYpiMqDEl2LW6SgL8xHjLXcK01E",
    authDomain: "restaurants-ed8c2.firebaseapp.com",
    projectId: "restaurants-ed8c2",
    storageBucket: "restaurants-ed8c2.appspot.com",
    messagingSenderId: "809178165880",
    appId: "1:809178165880:web:3a904ccf68964d996b338d"
  };
  // Initialize Firebase
  export const  firebaseApp = firebase.initializeApp(firebaseConfig);
