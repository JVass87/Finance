'use client'

import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'

interface CardProps {
  id: string
  title: string
  details: string
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: { title?: string; details?: string }) => void
  startEditing?: boolean
  onEditStart?: () => void
}

export default function Card({
  id,
  title,
  details,
  onDelete,
  onUpdate,
  startEditing = false,
  onEditStart,
}: CardProps) {
  const [editing, setEditing] = useState(startEditing)
  const [localTitle, setLocalTitle] = useState(title)
  const [localDetails, setLocalDetails] = useState(details)

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: editing,
  })

  const save = () => {
    const titleChanged = localTitle !== title
    const detailsChanged = localDetails !== details

    if (titleChanged) {
      onUpdate(id, { title: localTitle })
    }
    if (detailsChanged) {
      onUpdate(id, { details: localDetails })
    }

    setEditing(false)
  }

  const cancel = () => {
    setLocalTitle(title)
    setLocalDetails(details)
    setEditing(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      save()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancel()
    }
  }

  const handleDetailsKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault()
      save()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancel()
    }
  }

  if (editing) {
    return (
      <div className="card-edit">
        <div className="card-edit-header">
          <span className="card-edit-label">Editing</span>
          <button
            className="card-edit-close-btn"
            onClick={cancel}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          className="card-edit-input"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          placeholder="Card title"
          autoFocus
        />

        <textarea
          className="card-edit-textarea"
          value={localDetails}
          onChange={(e) => setLocalDetails(e.target.value)}
          onKeyDown={handleDetailsKeyDown}
          placeholder="Card details (optional)"
        />

        <div className="card-edit-actions">
          <button className="card-edit-btn card-edit-save" onClick={save}>
            Save
          </button>
          <button className="card-edit-btn card-edit-cancel" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      className={`card ${isDragging ? 'dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="card-header">
        <strong
          className="card-title"
          onClick={() => setEditing(true)}
          onDoubleClick={() => setEditing(true)}
        >
          {title}
        </strong>
        <button
          className="card-delete-btn"
          onClick={() => onDelete(id)}
          aria-label="Delete card"
        >
          ✕
        </button>
      </div>

      <div
        className={`card-details ${!details ? 'card-details-empty' : ''}`}
        onClick={() => setEditing(true)}
        onDoubleClick={() => setEditing(true)}
      >
        {details || '(click to add details)'}
      </div>
    </div>
  )
}
