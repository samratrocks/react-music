import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Howler, { Howl } from 'howler'
import ReactHowler from 'react-howler'


class SwapSource extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentSrcIndex: 0,
      playing: false,
      sources: [
        {name: 'MCR', src: 'https://cdn.shopify.com/s/files/1/0543/1257/t/30/assets/mcr.mp3'}, 
        {name: 'Wierf', src: 'http://www.noiseaddicts.com/samples_1w72b820/4629.mp3'},
        {name: 'Whuf', src: 'http://www.noiseaddicts.com/samples_1w72b820/2541.mp3'}]
    }
    
    this.handleSwap = this.handleSwap.bind(this) 
    this.handlePlay = this.handlePlay.bind(this)
    this.previousTrack = this.previousTrack.bind(this)
    this.skipForward = this.skipForward.bind(this)
    this.skipBackward = this.skipBackward.bind(this)
    
  }

  handleSwap () {
    // Get the numbers of song and move on to the next song
    let numberOfTracks = this.state.sources.length
    let nextIndex = 0
    if (this.state.currentSrcIndex + 1 >= numberOfTracks)  { nextIndex = 0 }
    else { nextIndex = this.state.currentSrcIndex + 1 } 
    this.setState({currentSrcIndex: nextIndex})
  }
  
  previousTrack() {
    let numberOfTracks = this.state.sources.length
    let nextIndex = 0
    if (this.state.currentSrcIndex - 1 < 0)  { nextIndex = numberOfTracks - 1 }
    else { nextIndex = this.state.currentSrcIndex - 1 } 
    this.setState({currentSrcIndex: nextIndex})
  }

  handlePlay () {
    this.state.playing ? this.setState({ playing: false }) : this.setState({ playing: true })
  }
  
  skipForward() {
    let currentPosition =  this.player.seek()
    this.player.seek(currentPosition + 5)
  }
  
  skipBackward() {
    let currentPosition = this.player.seek()
    // Unless the songs is less than 10 secs in
    if (currentPosition - 5 < 0) { this.player.seek(0) }
    if (!(currentPosition - 5 < 0)) { this.player.seek(currentPosition - 5) }
  }

  render () {
    return (
      <div>      
        <div className="swapplayer">
        <ReactHowler
          playing={this.state.playing}
          src={this.state.sources[this.state.currentSrcIndex].src}
          onEnd={this.handleSwap} 
          ref={(ref) => (this.player = ref) } />

          <h1 onClick={this.previousTrack}>Previous Track</h1>
          <h1 onClick={this.handlePlay}>{this.state.playing ? "||" : ">" }</h1>
          <div><span onClick={this.skipBackward}>&laquo;</span> <span onClick={this.skipForward}>&raquo;</span></div>
          <h1 onClick={this.handleSwap}>Skip Track</h1>
          <p>Currently playing {this.state.sources[this.state.currentSrcIndex].name }</p>
        </div>
      </div>
    )
  }
}


/*
  . Something beautiful
  . MusicController class
*/
class MusicControls extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <p>Under Construction</p>
  }
}

class PlayListView extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let list = this.props.playlist.map((item) => {
      return <li>{item.name}</li>
    })
    // will map given prop into list items
    return <div className="playlistView">
      <ol>
        {list}
      </ol>
    </div>
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return <div className="app"> 
      <SwapSource />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))