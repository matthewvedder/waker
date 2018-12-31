import React, { Component } from 'react'
import Navbar from './Navbar'
import Modal from './Modal'
import Thumbnail from './Thumbnail'
import Warrior2 from '../images/warrior2.jpg'
import KingPidgeon from '../images/king-pidgeon.jpg'
import Crow from '../images/crow.jpg'
import Locust from '../images/locust.jpg'
import DownDog from '../images/down-dog.jpg'
import '../styles/Selector.css'

class Selector extends Component {
  constructor(props) {
    super(props)
    this.mapAsanas = this.mapAsanas.bind(this)
  }

  mapAsanas(asanas) {
    return asanas.map(asana => <div class='selector-thumbnail'><Thumbnail img={asana}/></div>)
  }

  render() {
    const asanas = [ Warrior2, KingPidgeon, Crow, Locust, DownDog ]
    return (
      <div className='selector'>
        <Navbar />
        <div className='selector-container'>
          { this.mapAsanas(asanas) }
        </div>
      </div>
    )
  }
}

export default Selector
