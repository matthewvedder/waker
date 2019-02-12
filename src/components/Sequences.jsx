import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSequences } from '../actions'

class Sequences extends Component {
  componentWillMount() {
    this.props.fetchSequences()
  }

  mapSequences() {
    return this.props.sequences.map((sequence) => {
      return <div key={ sequence.id }>{ sequence.id }</div>
    })
  }
  render() {
    return (
      <div>
        { this.mapSequences() }
      </div>
    )
  }
}

const mapStateToProps = state => ({ sequences: state.sequence.sequences })

export default connect(mapStateToProps, { fetchSequences })(Sequences)
