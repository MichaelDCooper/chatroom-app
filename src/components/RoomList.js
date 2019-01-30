import React, {Component} from 'react';


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

  deleteRoom(roomName) {
    this.roomsRef.child(roomName.key).remove();
    const newRooms = [];
    this.state.rooms.map((room,index) => {
      if (room.key != roomName.key){
        newRooms.push(room);
      }
    });
    this.setState({rooms:newRooms});

  }


  render(){
    return (
      <div>

        <div className = "App">
          <h2 className= "room-list-head">Current Rooms:</h2>
          <ul className = "list-group">
              {this.state.rooms.map((room,index) =>
                <li
                className = "list-group-item"
                key = {index}
                onClick={() => this.props.setActiveRoom(room)} >
                Room Name: {room.name}
                <button
                className = "btn btn-outline-dark btn-sm"
                type = "button"
                key = {this.state.rooms.index}
                onClick={
                  e => {
                    e.preventDefault();
                    this.deleteRoom(room);}
                  }>
                   Delete
                </button>
                </li>
                )
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

      </div>
      )
    }
  }

export default RoomList;
