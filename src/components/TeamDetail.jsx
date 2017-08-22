import React from "react";
import PlayerDetail from "./PlayerDetail.jsx"
import PlayerSelector from "./PlayerSelector.jsx"

class TeamDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      players: [],
      focusPlayer: null
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextProps.team || nextProps.team === this.props.team){
      return;
    }
    const url = nextProps.team._links.players.href;
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("X-Auth-Token", "daacc2c57d5d47ba9594601d7f24bb68");
    request.addEventListener("load", () => {
      if(request.status === 200){
        const jsonString = request.responseText;
        const data = JSON.parse(jsonString);
        this.setState({
          players: data.players,
          focusPlayer: data.players[0]
        });
      }
    });
    request.send(); 
  }

  setFocusPlayer(player) {
    this.setState({
      focusPlayer: player
    })
  }

  render() {
    if(!this.props.team) {
      return null;
    }

    return(
      <div>
        <h3>{this.props.team.name}</h3>
        <img className="TeamBadge" src={this.props.team.crestUrl} alt={this.props.team.code} />
        <PlayerSelector 
          players={this.state.players}
          selectPlayer={this.setFocusPlayer.bind(this)}
        />
        <PlayerDetail player={this.state.focusPlayer}/>
      </div>
    ) 
  }
}

export default TeamDetail;