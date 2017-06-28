import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './playlist.css';

/*
  Todo: 
  1. Get the playlist from the parent component as props (x)
  2. Add functionality to remove items from the playlist
*/
class PlaylistComponent extends Component {
  constructor(props) {
    super(props)
    
  }
  
  render() {
    // props.list is an array of objects with {name: "blah", src: "blah.mp3"} format
    // props.current is the index of currently playing song
    let key = 0
    let items = this.props.list.map((item, index) => {
      key = key + 1
      let isCurrent = index == this.props.current ? "current" : "" 
      // Problem Spot
      return <li className={isCurrent} key={key} data-id={key} onClick={(e) => {this.props.songClicked(e)} }>{item.name}</li>
    })
    
    return <div>
      <h3>Queue:</h3>
        <ol>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {items}
        </ReactCSSTransitionGroup>
        </ol>
    </div>
  }
}

export default PlaylistComponent 