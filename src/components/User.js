import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  signOut = () => {
    this.props.firebase.auth().signOut();
  }
  render(){
    return (
      <React.Fragment>
        <div className = "App">
        <div>Current User: {this.props.user}</div>
          <button
          className = "sign-in-button"
          type = "button"
          onClick = { ()=>this.signInWithPopup()}

          >
            Sign In!
          </button>
          <button
          className = "sign-out-button"
          type = "button"
          onClick = { ()=>this.signOut()}

          >
            Sign Out!
          </button>

        </div>
      </React.Fragment>
    )
  }
}

export default User;
