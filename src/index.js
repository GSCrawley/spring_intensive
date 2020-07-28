import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import './index.css';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./Reducers/reducers";
import App from "./App";
import { BrowserRouter } from "react-router-dom";


export var firebaseConfig = {
    apiKey: "AIzaSyBt68W2a68uzvDkoHbLRYIqwrOVAtLW3k8",
    authDomain: "gids-chat-app-auth.firebaseapp.com",
    databaseURL: "https://gids-chat-app-auth.firebaseio.com",
    projectId: "gids-chat-app-auth",
    storageBucket: "gids-chat-app-auth.appspot.com",
    messagingSenderId: "9965876555",
    appId: "1:9965876555:web:bae664bdc9d64358b1e4ce",
    measurementId: "G-77YSP35QGS"
  };
  
  
  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
  };
  
//   firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  
  const initialState = {};
  const store = createStore(rootReducer, initialState);
  
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, //since we are using Firestore
  };
  
  ReactDOM.render(
    <React.StrictMode>
    
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <BrowserRouter>
          
            <App />
    
          </BrowserRouter>
        </ReactReduxFirebaseProvider>
      </Provider>
     
    </React.StrictMode>,
    document.getElementById("root")
  );