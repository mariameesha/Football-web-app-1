import React from "react";
import TeamSelector from "../components/TeamSelector.jsx"
import TeamDetail from "../components/TeamDetail.jsx"

class FootballContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      focusTeam: null
    };
  }

  componentDidMount() {
    const url = 'http://api.football-data.org/v1/competitions/445/teams';
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.setRequestHeader("X-Auth-Token", "daacc2c57d5d47ba9594601d7f24bb68");
    request.addEventListener("load", () => {
      if(request.status === 200){
        const jsonString = request.responseText;
        const data = JSON.parse(jsonString);
        this.setState({
          teams: data.teams,
          focusTeam: data.teams[0]
        });
      }
    });
    request.send(); 
  }

  setFocusTeam(team) {
    this.setState({
      focusTeam: team
    })
  }

  render() {
    return(
      <div>
        <h1>Premier League Teams</h1>
        <TeamSelector
        teams={this.state.teams}
        selectTeam={this.setFocusTeam.bind(this)}
        />
        <TeamDetail team={this.state.focusTeam}/>
      </div>
    );
  }

}

export default FootballContainer;