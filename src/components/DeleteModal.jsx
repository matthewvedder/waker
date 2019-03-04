import React from 'react'
import Modal from './Modal'
import '../styles/DeleteModal.css'

const DeleteModal = ({ onConfirm, onCancel, visible }) => {
  return (
    <Modal visible={visible} onClose={onCancel}>
      <div className='delete-modal'>
        <div>
          Are you sure you want to delete this?
        </div>
        <div className='delete-modal-btns'>
          <button className='btn-md ' onClick={onCancel}>Nevermind</button>
          <button className='btn-md' onClick={() => { onCancel(); onConfirm(); }}>Yes</button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
