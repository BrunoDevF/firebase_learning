import firebase from 'firebase/app';

import 'firebase/database';


let firebaseConfig = {
    apiKey: "AIzaSyC0Z_1fUCqWcYRKMvNS3K1clJ8SL1U6M1c",
    authDomain: "meuapp-79d58.firebaseapp.com",
    databaseURL: "https://meuapp-79d58-default-rtdb.firebaseio.com",
    projectId: "meuapp-79d58",
    storageBucket: "meuapp-79d58.appspot.com",
    messagingSenderId: "445938572580",
    appId: "1:445938572580:web:a35143666d96f0225c67b1",
    measurementId: "G-DVJ8J0H31M"
  };
  // Initialize Firebase
  if(!firebase.apps.length){

      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;