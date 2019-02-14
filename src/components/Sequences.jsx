import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { fetchSequences } from '../actions'
import '../styles/sequences.css'

class Sequences extends Component {
  componentWillMount() {
    this.props.fetchSequences()
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ sequences: state.sequence.sequences })

export default connect(mapStateToProps, { fetchSequences })(Sequences)
