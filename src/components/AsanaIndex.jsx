import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { fetchAsanas } from '../actions'
import CreateSequence from './CreateSequence'
import Modal from './Modal'
import moment from 'moment'
import DeleteModal from './DeleteModal'
import '../styles/sequences.css'

class Sequences extends Component {
  constructor(props) {
    super(props)
    this.state = { modalOpen: false, deleteModalOpen: false, hoveringOver: null, id: null }
  }
  componentWillMount() {
    this.props.fetchAsanas()
  }

  mapAsanas() {
    return this.props.asanas.map((asana) => {
      const { id, name, level, created_at } = asana
      return (
        <div
          className='sequence-container'
          onMouseEnter={() => this.setState({ hoveringOver: id })}
          onMouseLeave={() => this.setState({ hoveringOver: null })}
        >
          <Link to={`/asanas/${id}/edit`}>
            <div
              className='sequence'
              key={ id }
            >
              <div className='name'>{ name }</div>
            </div>
          </Link>
        </div>
      )
    })
  }
  render() {
    const { id } = this.state
    return (
      <div className='sequences-container'>
          <h1 id='sequences-title'>Asanas</h1>
        <div className='sequences'>
          { this.mapAsanas() }
        </div>
        <Link to={'/asanas/new'}>
          <div className='sequence' id='new-sequence'>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({ asanas: state.asanas.asanas })

export default connect(mapStateToProps, { fetchAsanas })(Sequences)
