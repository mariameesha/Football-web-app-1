import React from "react";

class TeamSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: undefined
    }
  }

  handleChange(event) {
    var newIndex = event.target.value;
    this.setState({
      selectedIndex: newIndex
    })

    const selectedTeam = this.props.teams[newIndex];
    this.props.selectTeam(selectedTeam);
  }

  render() {
    const options = this.props.teams.map((team, index) => {
      return <option value={index} key={index}>{team.name}</option>
    })
    return(
      <select
      id="teams"
      value={this.state.selectedIndex}
      onChange={this.handleChange.bind(this)}>
      {options}
      </select>
    )
  }
}

export default TeamSelector;