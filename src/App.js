import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const pokemon = [
    "bulbasaur", "charmander", "squrtle", "pikachu"
  ];
  const owner = [
    "brok's", "ash's", "misty's", "gary's", "team rocket's"
  ];
  /* const ownerpic = [

  ] */


  const adjective = owner[Math.floor(Math.random() * owner.length)];
  const noun = pokemon[Math.floor(Math.random() * pokemon.length)];
  return adjective + " " + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function avatarPic () {
  const slika = pokemon.value
  
    if (username.innerText === "bulbasaur") {
      return (
        <img src="https://static.wikia.nocookie.net/pokemontowerdefense/images/2/21/001Bulbasaur.png/revision/latest?cb=20130530130719"></img>
      )
    }
    
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
      img: avatarPic()
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("GoYblSlwybxgd0wr", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Pokemon Chat</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input
          onSendMessage={this.onSendMessage}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;