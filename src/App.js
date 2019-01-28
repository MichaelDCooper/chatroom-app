import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';
import './App.css';

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
  constructor(props){
    super(props);

    this.state = {
      activeRoom:"Select a Room",
      activeRoomId:null,
     currentUser:""
    };
  }

  setActiveRoom = selectedRoom => {
    this.setState({ activeRoom: selectedRoom.name});
    this.setState({ activeRoomId: selectedRoom.key});
  }

  setUser = user => {
  this.setState({ currentUser: user });
};

  render() {
    return (
      <div className="App">

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Chatroom</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                <User
                firebase={firebase}
                setUser = {this.setUser}
                user={this.state.currentUser}/>
              </a>
            </li>
          </ul>
        </div>
      </nav>

        <header id = "header">
          <h1>Chatroom App</h1>
        </header>

        <section className = "main">
          <div className = "container">
            <div className = "row">
              <div className = "col-sm-6">
                <RoomList
                setActiveRoom={this.setActiveRoom}
                activeRoom={this.state.activeRoom}
                firebase = {firebase}/>
              </div>
              <div className = "col-sm-6">
                <MessageList
                firebase = {firebase}
                activeRoom={this.state.activeRoom}
                activeRoomId={this.state.activeRoomId}
                user={this.state.currentUser}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
