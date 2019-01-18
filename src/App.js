import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <main>
          <RoomList firebase = {firebase} />
        </main>
      </div>
    );
  }
}

export default App;
