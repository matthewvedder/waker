import React from 'react'
import { connect } from 'react-redux'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import _ from 'lodash'

class ImageEditor extends React.Component {
  state = {
    image: this.props.initialImage,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    preview: null,
    width: 400,
    height: 400,
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.initialImage, this.props.initialImage)) {
      this.setState({ image: nextProps.initialImage, disableClick: true })
    }
  }

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  rotateLeft = e => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90,
    })
  }

  rotateRight = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90,
    })
  }


  handleXPosition = e => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = e => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  logCallback(e) {
    // eslint-disable-next-line
    console.log('callback', e)
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0], disableClick: true })
  }

  render() {
    const { height, width, disableClick } = this.state
    return (
      <div>
      <Dropzone onDrop={this.handleDrop} disableClick={disableClick}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <ReactAvatarEditor
                ref={this.props.setEditorRef}
                scale={parseFloat(this.state.scale)}
                position={this.state.position}
                width={width}
                height={height}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                onImageReady={this.logCallback.bind(this, 'onImageReady')}
                image={this.state.image}
                className="editor-canvas"
              />
            </div>
          )
        }}
      </Dropzone>



        <br />
        New File:
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min="0.1"
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft}>Left</button>
        <button onClick={this.rotateRight}>Right</button>
        <br />
      </div>
    )
  }
}

export default connect(null)(ImageEditor)
