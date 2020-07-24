import React, { useState } from 'react'
import Thumbnail from './Thumbnail'
import InstanceNotesEdit from './InstanceNotesEdit'
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import '../styles/AsanaInstanceDrag.css'

const useStyles = makeStyles((theme) => {
  return {
    name: {
      color: theme.palette.primary.main
    }
  }
})

const AsanaInstanceDrag = ({ image, asana, onDelete, handleEditClick, id }) => {
  const [hovering, setHovering] = useState(false);
  const classes = useStyles()

  return (
    <div id={id} className='asana-instance-drag'>
      <div
        className='instance'
        onMouseEnter={() => setHovering(true) }
        onMouseLeave={() => setHovering(false) }
      >
        <div className='instance-image-drag'>
          <Thumbnail img={image}/>
        </div>
        <div className='instance-drag-info'>
          <div className={classes.name}>
            { asana.asana.name }
          </div>
          <InstanceNotesEdit notes={asana.notes} id={id} />
        </div>
        <div className='instance-drag-icons'>
          <FontAwesomeIcon
            className='instance-drag-trash instance-drag-icon'
            icon={faTrash}
            onClick={onDelete}
            style={{ display: hovering ? 'inherit' : 'none' }}
          />
        </div>
      </div>
    </div>
  )
}

export default AsanaInstanceDrag
