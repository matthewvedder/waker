import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAsanaInstance, fetchAsanas } from '../actions'
import Navbar from './Navbar'
import DragElement from './DragElement'
import Thumbnail from './Thumbnail'
import '../styles/Selector.css'

class Selector extends Component {
  constructor(props) {
    super(props)
    this.mapAsanas = this.mapAsanas.bind(this)
  }

  componentWillMount() {
    this.props.fetchAsanas()
  }

  sequenceId() {
    const { pathname } = window.location
    return pathname.split('/')[2]
  }

  mapAsanas() {
    const { asanas } = this.props
    return asanas.map((asana, index) => {
      return (
        <DragElement onDrop={() => this.props.createAsanaInstance(asana.id, this.sequenceId())} asana_id={asana.id} key={asana.id}>
          <div className='selector-thumbnail'><Thumbnail img={asana.thumbnail}/></div>
        </DragElement>
      )
    })
  }

  render() {

    return (
      <div className='selector'>
        <Navbar />
        <div className='selector-container'>
          { this.mapAsanas() }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ asanas: state.asanas.asanas })

export default connect(mapStateToProps, { createAsanaInstance, fetchAsanas })(Selector)
