import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { fetchSequences } from '../actions'
import CreateSequence from './CreateSequence'
import Modal from './Modal'
import '../styles/sequences.css'

class Sequences extends Component {
  constructor(props) {
    super(props)
    this.state = { modalOpen: false }
    this.handleAddClick = this.handleAddClick.bind(this)
  }
  componentWillMount() {
    this.props.fetchSequences()
  }

  handleAddClick() {
    this.setState({ modalOpen: true })
  }

  mapSequences() {
    return this.props.sequences.map((sequence) => {
      return (
        <Link to={`/sequences/${sequence.id}`}>
          <div className='sequence' key={ sequence.id }>
            <div className='name'>{ sequence.name }</div>
            <div className='level'>{ sequence.level }</div>
          </div>
        </Link>
      )
    })
  }
  render() {
    return (
      <div className='sequence-container'>
        <h1 id='sequences-title'>My Sequences</h1>
        <div className='sequences'>
          { this.mapSequences() }
          <div className='sequence' id='new-sequence' onClick={this.handleAddClick}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <Modal visible={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })} >
          <CreateSequence onCreate={() => this.setState({ modalOpen: false })} />
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({ sequences: state.sequence.sequences })

export default connect(mapStateToProps, { fetchSequences })(Sequences)
