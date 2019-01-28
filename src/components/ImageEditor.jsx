import React, { Component } from 'react'
import classNames from 'classnames'
import ReactAvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'

class ImageEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { image: null, disableClick: false }
  }
   onDrop = (dropped) => {
     this.setState({ image: dropped[0], disableClick: true })
   }

   render() {
     const { image, disableClick } = this.state
    return (
      <Dropzone onDrop={this.onDrop} disableClick={disableClick}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
            >
              <input {...getInputProps()} />
              {
                <ReactAvatarEditor width={250} height={250} image={image} />
              }
            </div>
          )
        }}
      </Dropzone>
    )
  }
}

export default ImageEditor
