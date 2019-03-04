import React from 'react'
import Modal from './Modal'
import InstanceEditForm from './InstanceEditForm'

const InstanceEditModal = ({ visible, instance_id, onClose }) => {
  if (!instance_id) return <div />
  return (
    <Modal visible={visible} onClose={onClose}>
      <InstanceEditForm instance_id={instance_id} onSubmit={onClose}/>
    </Modal>
  )
}

export default InstanceEditModal
