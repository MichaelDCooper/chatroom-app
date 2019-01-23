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
      activeRoom:null,
      activeRoomId:'',
      currentUser:"Guest"
    };
  }

  setActiveRoom = (selectedRoom) => {
    this.setState({ activeRoom: selectedRoom.name});
    this.setState({ activeRoomId: selectedRoom.key});
  }

  setUser = user => {
  this.setState({ currentUser: user.displayName });
};

  render() {
    return (
      <div className="App">
        <RoomList
        setActiveRoom={this.setActiveRoom}
        activeRoom={this.state.activeRoom}
        firebase = {firebase}/>
        <MessageList firebase = {firebase}
        setActiveRoom={this.setActiveRoom}
        activeRoom={this.state.activeRoom}
        activeRoomId={this.state.activeRoomId}/>
        <User
        firebase={firebase}
        setUser = {this.state.setUser}
        user={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
