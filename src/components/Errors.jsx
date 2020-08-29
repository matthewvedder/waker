import React from 'react'
import Alert from './Alert'

const Errors = (props) => {
  const { errors } = props
  return (
    <div>
        {errors.map((error, index) => (
          <Alert
            key={index}
            message={error}
            severity='error'
            style={{ width: '50ch' }}
          />
        ))}
    </div>
  )
}

export default Errors
