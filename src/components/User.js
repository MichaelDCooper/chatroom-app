import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
  this.props.firebase.auth().onAuthStateChanged(user => {
    this.props.setUser(user);
  });
}

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOutWithPopup = () => {
    this.props.firebase.auth().signOut();
  }
  render(){
    return (
      <div>
        <div className = "App">
        <div>
            Current User: {this.props.user? this.props.user.displayName : " Guest "}
          <button
          className = "btn btn-outline-dark btn-sm"
          type = "button"
          onClick = {this.signInWithPopup}>
            Sign In
          </button>
          <button
          className = "btn btn-outline-dark btn-sm"
          type = "button"
          onClick = {this.signOutWithPopup}>
            Sign Out
          </button>
          </div>
        </div>
      </div>
    )
  }
}

export default User;
