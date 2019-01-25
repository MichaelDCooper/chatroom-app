import React, {Component} from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);

    this.state = {
      messages: [],
      newMessageContent:null
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });

  }

  handleChange(e){
    this.setState({newMessageContent: e.target.value});
  }

  createMessage(newMessage){
    this.messagesRef.push({
      roomId: this.props.activeRoomId,
      username: this.props.user? this.props.user.displayName : " Guest",
      content: this.state.newMessageContent,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState({
      newMessageContent:''
    });
  }

render() {
  return (
  <div>
    <div className = "App">
      <div className="activeRoom">
        <h4>Active Room: {this.props.activeRoom}</h4>
      </div>
      <ul className = "list-group">
      {
      this.state.messages
        .filter(message => message.roomId === this.props.activeRoomId)
        .map((message, index) => (
          <div>
            <li className = "list-group-item" key = {index}>Room ID:{message.roomId}</li>
            <li className = "list-group-item" key = {index}>Username: {message.username}</li>
            <li className = "list-group-item" key = {index}>Message:{message.content}</li>
            <li className = "list-group-item" key = {index}>Time Sent: {message.sentAt}</li>
          </div>
        ))}
        </ul>
      </div>
      <div className = "newMessageForm">
          <h2 className = "form-header">Create a new message:</h2>
           <form
           id = "messageForm"
           onSubmit={ e => {
              e.preventDefault();
             this.createMessage(this.state.newMessageContent);
           }}>
           <input
           type = "text"
           id= "roomName"
           value = {this.state.newMessageContent}
           onChange = { (e) => this.handleChange(e) }/>
           <input type = "submit" />
          </form>

      </div>

    </div>
    )
  }
}

export default MessageList;
