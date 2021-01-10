import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// import firebase from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCpR5amVsmlhR4Q5vJYIOKvUlOfY7TrjsM",
    authDomain: "simple-note-firebase-5e1c5.firebaseapp.com",
    projectId: "simple-note-firebase-5e1c5",
    storageBucket: "simple-note-firebase-5e1c5.appspot.com",
    messagingSenderId: "173976605888",
    appId: "1:173976605888:web:80552051c72764f0658925",
    measurementId: "G-XSXWS4B9M1"
};
firebase.initializeApp(firebaseConfig);
export const database = firebase.database()
export default firebase