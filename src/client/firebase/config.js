const firebase = require('firebase');
const devConfig = {
  apiKey: "AIzaSyA0Hz8u1Dz2QdAr_w88PYiED0zW_RSS2W8",
  authDomain: "table-tennis-dev.firebaseapp.com",
  databaseURL: "https://table-tennis-dev.firebaseio.com",
  projectId: "table-tennis-dev",
  storageBucket: "table-tennis-dev.appspot.com",
  messagingSenderId: "43118045607"
};
const prodConfig = {
  apiKey: "AIzaSyBm6O9Awm96z3BTfuIJ3ZikcfroZRjNvkY",
  authDomain: "table-tennis-5ec15.firebaseapp.com",
  databaseURL: "https://table-tennis-5ec15.firebaseio.com",
  projectId: "table-tennis-5ec15",
  storageBucket: "table-tennis-5ec15.appspot.com",
  messagingSenderId: "60558642448"
};

export const firebaseInit = firebase.initializeApp(process.env.NODE_ENV == 'development' ? devConfig : prodConfig);
export const rootRef = firebase.database().ref();
