import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAsanaInstance, fetchAsanas } from '../actions'
import Selector from './Selector'
import Thumbnail from './Thumbnail'
import '../styles/Selector.css'

class SelectorContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { filteredAsanas: [] }
    this.mapAsanas = this.mapAsanas.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount() {
    this.props.fetchAsanas()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filteredAsanas: nextProps.asanas })
  }

  sequenceId() {
    const { pathname } = window.location
    return pathname.split('/')[2]
  }

  handleSearch(event) {
    const search = event.target.value.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
    const filteredAsanas = this.props.asanas.filter((asana) => {
      return !asana.name.search(new RegExp(search, 'i'))
    })
    this.setState({ filteredAsanas })
  }

  mapAsanas() {
    const { filteredAsanas } = this.state
    return filteredAsanas.map((asana, index) => {
      return (
        <div>
          <div className='selector-thumbnail'><Thumbnail img={asana.thumbnail}/></div>
          <div className='asana-name'>{asana.name}</div>
        </div>
      )
    })
  }

  render() {

    return (
      <div className='selector'>
        <div className='selector-header'>
          <input placeholder="Search" onChange={this.handleSearch} className='selector-search' />
          <div className="sequence-title">{this.props.sequenceName}</div>
          <div />
        </div>
        <Selector filteredAsanas={this.state.filteredAsanas}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({ asanas: state.asanas.asanas })

export default connect(mapStateToProps, { createAsanaInstance, fetchAsanas })(SelectorContainer)
