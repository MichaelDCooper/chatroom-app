import React, {Component} from 'react';
import App from "./../App";

class RoomList extends Component{
  constructor(props){
    super(props);

    this.state = {
      rooms: [],
    };
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
  });

}

  handleChange(e){
    this.setState({newRoomName: e.target.value});
  }


  newRoom(newRoomName){
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({
      newRoomName:''
    });
  }


  render(){
    return (
      <React.Fragment>

        <div className = "App">
          <h2 className= "room-list-head">Current Rooms:</h2>
          <ul className = "room-list">
              {this.state.rooms.map((room,index) =>
                <li
                className = "room"
                key = {index}
                onClick={() => this.props.setActiveRoom(room)} >
                Room Name: {room.name}
                </li>)
              }
          </ul>
        </div>
        

        <div className = "newRoomForm">
          <h2 className = "form-header">Create new room:</h2>
           <form
           id = "chatroomForm"
           onSubmit={ e => { e.preventDefault(); this.newRoom(this.state.newRoomName);}}>
           <input
           type = "text"
           id= "roomName"
           value = {this.state.newRoomName}
           onChange = { (e) => this.handleChange(e) }/>
           <input type = "submit" />
          </form>
        </div>

      </React.Fragment>
      )
    }
  }

export default RoomList;
