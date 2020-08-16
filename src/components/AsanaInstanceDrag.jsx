import React, { useState } from 'react'
import Thumbnail from './Thumbnail'
import InstanceNotesEdit from './InstanceNotesEdit'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import '../styles/AsanaInstanceDrag.css'

const useStyles = makeStyles((theme) => {
  return {
    name: {
      color: theme.palette.primary.main,
      paddingLeft: '.5em',
      marginTop: '-1em'
    },
    notes: {
      margin: '1em',
      marginLeft: '.5em',
      paddingRight: '.1em',
      height: '5em',
      overflowY: 'scroll'
    }
  }
})

const AsanaInstanceDrag = ({ image, asanaInstance, onDelete, canEdit, id }) => {
  const [hovering, setHovering] = useState(false);
  const classes = useStyles()

  const InstanceNotes = () => (
    <div className={classes.notes}>
      <Typography color='textSecondary' variant='body2'>
        { asanaInstance.notes }
      </Typography>
    </div>
  )

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
          <Typography className={classes.name}>
            { asanaInstance.asana.name }
          </Typography>
          { canEdit && (
            <InstanceNotesEdit notes={asanaInstance.notes} id={id} />
          )}
          { (!canEdit) && (
            <InstanceNotes />
          )}
        </div>
        <div className='instance-drag-icons'>
          { canEdit && (
            <FontAwesomeIcon
              className='instance-drag-trash instance-drag-icon'
              icon={faTrash}
              onClick={onDelete}
              style={{ display: hovering ? 'inherit' : 'none' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default AsanaInstanceDrag
