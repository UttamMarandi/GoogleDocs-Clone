import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpMju5Y4lhWvcYlZuJf3Cj4PIRg6lqeUU",
  authDomain: "docs-clone-uttam.firebaseapp.com",
  projectId: "docs-clone-uttam",
  storageBucket: "docs-clone-uttam.appspot.com",
  messagingSenderId: "945996652042",
  appId: "1:945996652042:web:fa725605c58d21c886c9f3",
};

//as we be using server side rendering , there are moments when the app is already initialized. We don't want to double intitalize the app
//so we check for existance of app useing firebase.apps.length

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export { db };
