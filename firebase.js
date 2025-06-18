// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// IMPORTANT: Replace these values with your actual Firebase config from the Firebase Console
// Go to Project Settings > General > Your apps > Firebase SDK snippet
const firebaseConfig = {
  apiKey: "AIzaSyDIzdkSZ4TLbzXTJKjZ_lSYtu5kAayRmxQ",
  authDomain: "hostel-app-eeefe.firebaseapp.com",
  projectId: "hostel-app-eeefe",
  storageBucket: "hostel-app-eeefe.firebasestorage.app",
  messagingSenderId: "70589054118",
  appId: "1:70589054118:android:5a6c259709eb79b15dc867"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };

