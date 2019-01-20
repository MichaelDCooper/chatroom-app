import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxVQoVC1HkJMS9XqEWawJFQi63cGM4JiQ",
    authDomain: "chatroom-app-67193.firebaseapp.com",
    databaseURL: "https://chatroom-app-67193.firebaseio.com",
    projectId: "chatroom-app-67193",
    storageBucket: "chatroom-app-67193.appspot.com",
    messagingSenderId: "978067687202"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase = {firebase} />
      </div>
    );
  }
}

export default App;
