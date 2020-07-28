import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import { functions } from "firebase";


var firebaseConfig = {
    apiKey: "AIzaSyBt68W2a68uzvDkoHbLRYIqwrOVAtLW3k8",
    authDomain: "gids-chat-app-auth.firebaseapp.com",
    databaseURL: "https://gids-chat-app-auth.firebaseio.com",
    projectId: "gids-chat-app-auth",
    storageBucket: "gids-chat-app-auth.appspot.com",
    messagingSenderId: "9965876555",
    appId: "1:9965876555:web:bae664bdc9d64358b1e4ce",
    measurementId: "G-77YSP35QGS"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };
  
  export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
  
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
  
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };
  
  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
  
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };


