import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Howler, { Howl } from 'howler'
import ReactHowler from 'react-howler'
import PlaylistComponent from './playlist'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


/* 
Structure:  
Todo next (in no particular order):
 1. Divide up into smaller components
 2. Clean out / refactor
 3. Add animation
 4. Add in external links and event handling ( √ )
 5. Add a new playlist component that shows all the songs ( √ )
  - How to import a component in React js ( √ )
 6. Add functionality to remove items from the playlist ( √ )
 7. Dont add the same track twice ( √ )

Solved Issues:
 1. Wrong item is popped off the stack 

Bugs:
 1. Dosen't skip if same track added twice
  Explanation:
  (!)  State doesn't change since Howler gets props using the source file, so if the same 
    file is passed twice, howler refuses to change songs.
  
*/


/* 
* What components can I split this into...?
*  1. Get it hosted
*  2. 
*/


// Dropbox shit


// SwapSource is the main component
class SwapSource extends React.Component {
  constructor (props) {
    super(props)
    
    /* Let's write some comments */
    this.state = {
      currentSrcIndex: 0,
      playing: false,
      sources: [{name: 'MCR', src: 'https://cdn.shopify.com/s/files/1/0543/1257/t/30/assets/mcr.mp3'}],
      visible: false,
      minimized: false
    }
    
    this.handleSwap = this.handleSwap.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.previousTrack = this.previousTrack.bind(this)
    this.skipForward = this.skipForward.bind(this)
    this.skipBackward = this.skipBackward.bind(this)
    this.songClicked = this.songClicked.bind(this)
  }

  componentDidMount() {

    let songsNodes = document.querySelectorAll(".song")     // Returns a Nodelist which is not an array
    let songs = Array.prototype.slice.call(songsNodes)     // Convert nodeList into array
    
    songs.map((item) => {
      item.addEventListener("click", (e) => {
        
        let dataSrc= e.target.attributes["data-src"].nodeValue
        let dataName = e.target.attributes["data-name"].nodeValue
        let lastSong = this.state.sources[this.state.sources.length - 1].src
        if (lastSong !== dataSrc ) { this.setState({sources: this.state.sources.concat({name: dataName, src: dataSrc})}) }
        else { console.log("[DEV]: Song already in the playlist. Add a good user feedback for this.") }
        
        
        if (!this.state.visible) this.setState({visible: true})
      })
    })
  }
  
  componentDidNotMount () {
    let atomicIndex = '20'
    let bromsic = '50'
    let currentSrcIndex
    
    currentSrcIndex = -(-atomicIndex-bromsic)
    currentSrcIndex = ~~atomicIndex+~~bromsic
    currentSrcIndex = +atomicIndex+ +bromsic
    currentSrcIndex = atomicIndex- -bromsic
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
  
  songClicked(e) {
    // should remove the song
    console.log(e.target)
    let key = e.target.attributes['data-id'].nodeValue
    let tempState = this.state.sources
    if (tempState.length !== 1) { 
      tempState.splice(key - 1, 1)
      this.setState({sources: tempState})
      console.dir(tempState)
    }
  }

  render () {
    return (
      <div className={this.state.visible ? "visible" : "hidden" }>      
        <div className="swapplayer">
        <ReactHowler
          playing={this.state.playing}
          src={this.state.sources[this.state.currentSrcIndex].src}
          current={this.state.currentSrcIndex}
          onEnd={this.handleSwap}
          ref={(ref) => (this.player = ref) } />

          <h1 onClick={this.previousTrack}>Previous Track</h1>
          <h1 onClick={this.handlePlay}>{this.state.playing ? "||" : ">" }</h1>
          <div><span onClick={this.skipBackward}>&laquo;</span> <span onClick={this.skipForward}>&raquo;</span></div>
          <h1 onClick={this.handleSwap}>Skip Track</h1>
          <p>Currently playing {this.state.sources[this.state.currentSrcIndex].name }</p>
          <PlaylistComponent list={this.state.sources} current={this.state.currentSrcIndex} songClicked={this.songClicked}/>
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props){
    super(props)
  }
  
  render() {
    return <div className="app" > 
      <SwapSource />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'))