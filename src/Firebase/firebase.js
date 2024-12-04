import firebase from "firebase/compat/app";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyBL4zGIxpJM9K-xiZPJDGdPyvOHJYEk8xo",
	authDomain: "empower-79b6b.firebaseapp.com",
	projectId: "empower-79b6b",
	storageBucket: "empower-79b6b.appspot.com",
	messagingSenderId: "241451860994",
	appId: "1:241451860994:web:ec5a39e62c8f20aa16131b",
	measurementId: "G-4TBPWPJZ8V",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };