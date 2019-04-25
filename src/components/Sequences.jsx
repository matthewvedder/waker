import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { fetchSequences, deleteSequence } from '../actions'
import CreateSequence from './CreateSequence'
import Modal from './Modal'
import moment from 'moment'
import DeleteModal from './DeleteModal'
import '../styles/sequences.css'

class Sequences extends Component {
  constructor(props) {
    super(props)
    this.state = { modalOpen: false, deleteModalOpen: false, hoveringOver: null, id: null }
    this.handleAddClick = this.handleAddClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentWillMount() {
    this.props.fetchSequences()
  }

  handleAddClick() {
    this.setState({ modalOpen: true })
  }

  handleDeleteClick(id) {
    this.setState({ id, deleteModalOpen: true })
  }

  mapSequences() {
    return this.props.sequences.map((sequence) => {
      const { id, name, level, created_at } = sequence
      return (
        <div
          className='sequence-container'
          onMouseEnter={() => this.setState({ hoveringOver: id })}
          onMouseLeave={() => this.setState({ hoveringOver: null })}
        >
          <Link to={`/sequences/${id}`}>
            <div
              className='sequence'
              key={ id }
            >
              <div className='name'>{ name }</div>
              <div className='created-at'>{ moment(created_at).format('MMMM Do YYYY') }</div>
            </div>
          </Link>
          <FontAwesomeIcon
            className='sequence-trash'
            icon={faTrash}
            onClick={() => this.handleDeleteClick(id)}
            style={{ display: this.state.hoveringOver === id ? 'inherit' : 'none' }}
          />
        </div>
      )
    })
  }
  render() {
    const { id, deleteModalOpen } = this.state
    return (
      <div className='sequences-container'>
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
        <DeleteModal
          visible={deleteModalOpen}
          onConfirm={() => this.props.deleteSequence(id)}
          onCancel={() => this.setState({ deleteModalOpen: false })}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({ sequences: state.sequence.sequences })

export default connect(mapStateToProps, { fetchSequences, deleteSequence })(Sequences)
