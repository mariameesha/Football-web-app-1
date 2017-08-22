import React from "react";

class PlayerDetail extends React.Component {

  render() {
    if(!this.props.player) {
      return null;
    }

    return(
      <div>
        <h5>{this.props.player.name}</h5>
        <h5>{this.props.player.position}</h5>
        <h5>Squad Number: {this.props.player.jerseyNumber}</h5>
        <h5>Country: {this.props.player.nationality}</h5>
      </div>
    ) 
  }
}

export default PlayerDetail;