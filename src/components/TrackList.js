import React from "react";
import Track from './Track';
import "../styles/TrackList.css";

class TrackList extends React.Component {
  render() {
    return (
      <div class="TrackList">
        {
          this.props.tracks.map(track => {
            return <Track 
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval}
            />
          })
        }
      </div>
    );
  }
}

export default TrackList;
