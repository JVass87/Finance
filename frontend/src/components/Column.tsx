'use client'

import { useState } from 'react'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import Card from './Card'

export interface ICard {
  id: string
  title: string
  details: string
}

interface ColumnProps {
  id: string
  title: string
  cards: ICard[]
  onAddCard: (colId: string) => void
  onDeleteCard: (colId: string, cardId: string) => void
  onUpdateCard: (colId: string, cardId: string, updates: Partial<ICard>) => void
  onRenameColumn: (colId: string, newTitle: string) => void
  autoEditCardId?: string | null
  onCardEditStart?: (cardId: string) => void
}

export default function Column({
  id,
  title,
  cards,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  onRenameColumn,
  autoEditCardId,
  onCardEditStart,
}: ColumnProps) {
  const [renamingTitle, setRenamingTitle] = useState(title)
  const [isRenaming, setIsRenaming] = useState(false)

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id,
  })

  const { attributes, listeners, setNodeRef: setDragRef } = useDraggable({
    id,
  })

  const handleRenameStart = () => {
    setRenamingTitle(title)
    setIsRenaming(true)
  }

  const handleRenameSave = () => {
    if (renamingTitle.trim()) {
      onRenameColumn(id, renamingTitle)
    }
    setIsRenaming(false)
  }

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRenameSave()
    } else if (e.key === 'Escape') {
      setIsRenaming(false)
    }
  }

  return (
    <div className="column">
      <div
        className="column-header"
        ref={setDragRef}
        {...attributes}
        {...listeners}
      >
        {isRenaming ? (
          <input
            type="text"
            className="column-header-input"
            value={renamingTitle}
            onChange={(e) => setRenamingTitle(e.target.value)}
            onBlur={handleRenameSave}
            onKeyDown={handleRenameKeyDown}
            autoFocus
          />
        ) : (
          <div
            className="column-header-title"
            onDoubleClick={handleRenameStart}
          >
            {title}
          </div>
        )}

        <button
          className="add-card-btn"
          onClick={() => onAddCard(id)}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label="Add card"
        >
          + Add
        </button>
      </div>

      <div
        ref={setDropRef}
        className={`cards ${isOver ? 'over' : ''}`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            details={card.details}
            onDelete={(cardId) => onDeleteCard(id, cardId)}
            onUpdate={(cardId, updates) =>
              onUpdateCard(id, cardId, updates)
            }
            startEditing={autoEditCardId === card.id}
            onEditStart={() => onCardEditStart?.(card.id)}
          />
        ))}
      </div>
    </div>
  )
}
