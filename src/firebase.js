import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBnvD41aehEXX_NuWKwMMi0_GuYWr4kSnw",
  authDomain: "todo-pro-2a9da.firebaseapp.com",
  projectId: "todo-pro-2a9da",
  storageBucket: "todo-pro-2a9da.appspot.com",
  messagingSenderId: "997159773723",
  appId: "1:997159773723:web:7b2e9ee642859267427abe",
  measurementId: "G-VZZ6N9RRLC",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebaseapp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
