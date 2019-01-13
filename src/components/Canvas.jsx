import React, { Component } from 'react'
import GridLayout from 'react-grid-layout'
import Selector from './Selector'
import DropTarget from './DropTarget'
import Modal from './Modal'
import Thumbnail from './Thumbnail'
import Warrior2 from '../images/warrior2.jpg'
import KingPidgeon from '../images/king-pidgeon.jpg'
import Crow from '../images/crow.jpg'
import Locust from '../images/locust.jpg'
import DownDog from '../images/down-dog.jpg'
import '../styles/Canvas.css'

const layout = [
  {i: 'a', x: 0, y: 0, w: 1, h: 17},
  {i: 'b', x: 1, y: 0, w: 1, h: 17},
  {i: 'c', x: 2, y: 0, w: 1, h: 17},
  {i: 'd', x: 3, y: 0, w: 1, h: 17},
  {i: 'e', x: 4, y: 0, w: 1, h: 17},
]

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = { layout:  layout }
  }

  mapImages() {
    const keys=['a', 'b', 'c', 'd', 'e']
    return [Warrior2, KingPidgeon, Crow, Locust, DownDog].map((img, index) => {
      return (
        <div key={keys[index]}>
          <Thumbnail img={img}/>
        </div>
      )
    })
  }


  render() {

    return (
      <div className='canvas'>
        <Selector />
        <DropTarget>
          <div className='grid'>
            <GridLayout
              className="layout"
              layout={this.state.layout}
              cols={6}
              rowHeight={1}
              width={1200}
              isResizable={false}
            >
              {this.mapImages()}

            </GridLayout>
          </div>
        </DropTarget>
        <Modal visible={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })}/>
      </div>
    )
  }
}

export default Canvas
