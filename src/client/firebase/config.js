const firebase = require('firebase');
var config = {
  apiKey: "AIzaSyBm6O9Awm96z3BTfuIJ3ZikcfroZRjNvkY",
  authDomain: "table-tennis-5ec15.firebaseapp.com",
  databaseURL: "https://table-tennis-5ec15.firebaseio.com",
  projectId: "table-tennis-5ec15",
  storageBucket: "table-tennis-5ec15.appspot.com",
  messagingSenderId: "60558642448"
};
export const firebaseInit = firebase.initializeApp(config);
export const rootRef = firebase.database().ref();
export const messaging = firebase.messaging();


// this.state.players.sort(function(a, b) {
//     return (a.rank) - (b.rank);
// });
