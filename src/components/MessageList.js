import React, {Component} from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);

    this.state = {
      messages: [],
    };
    this.messagesRef = this.props.firebase.database().ref('messages')
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });

}


render() {
  return (
  <React.Fragment>
    <div className = "App">
      <div className="activeRoom">
        Active Room: {this.props.activeRoom}
      </div>
      {
      this.state.messages
        .filter(message => message.roomId === this.props.activeRoomId)
        .map((message, index) => (
          <div>
            <p key = {index}>Username: {message.username}</p>
            <p key = {index}>Message:{message.content}</p>
            <p key = {index}>Time Sent: {message.sentAt}</p>
            <p key = {index}>Room ID:{message.roomId}</p>
          </div>
        ))};
      </div>

    </React.Fragment>
    )
  }
}

export default MessageList;
