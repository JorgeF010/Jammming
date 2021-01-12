import React from "react";
import "./App.css";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Spotify from "./util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({
      playlistTracks: tracks,
    });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const indexOfTrack = tracks.findIndex(
      (savedTrack) => savedTrack.id === track.id
    );
    tracks.splice(indexOfTrack, 1);
    this.setState({
      playlistTracks: tracks,
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name,
    });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then((searchResults) => {
      this.setState({
        searchResults: searchResults,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div class="App">
          <SearchBar onSearch={this.search} />
          <div class="App-playlist"></div>
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onNameChange={this.updatePlaylistName}
            onRemove={this.removeTrack}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;
