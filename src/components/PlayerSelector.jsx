import React from "react";

class PlayerSelector extends React.Component {

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

    const selectedPlayer = this.props.players[newIndex];
    this.props.selectPlayer(selectedPlayer);
  }

  render() {
    const options = this.props.players.map((player, index) => {
      return <option value={index} key={index}>{player.name}</option>
    })
    return(
      <select
      id="players"
      value={this.state.selectedIndex}
      onChange={this.handleChange.bind(this)}>
      {options}
      </select>
    )
  }
}

export default PlayerSelector;