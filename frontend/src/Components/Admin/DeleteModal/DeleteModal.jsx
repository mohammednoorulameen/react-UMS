import React from 'react'

const DeleteModal = ({isVisible, onClose, onConfirm, user, }) => {
  if (!isVisible) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete?</h3>
        <p className="mb-6">confirm delete {user}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}  
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}  
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal