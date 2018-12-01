import React, { Component } from 'react'
import Navbar from './Navbar'
import Thumbnail from './Thumbnail'
import Image1 from '../images/pose.jpeg'
import Image2 from '../images/pose2.jpeg'
import Image3 from '../images/pose3.jpeg'
import Image4 from '../images/pose4.jpeg'
import Image5 from '../images/pose5.jpeg'
import '../styles/Canvas.css'

class Canvas extends Component {
  render() {
    return (
      <div className='canvas'>
        <Navbar />
        <div>
          <Thumbnail img={Image1}/>
          <Thumbnail img={Image2}/>
          <Thumbnail img={Image3}/>
          <Thumbnail img={Image4}/>
          <Thumbnail img={Image5}/>
        </div>
      </div>
    )
  }
}

export default Canvas
