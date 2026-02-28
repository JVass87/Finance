'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import Column, { ICard } from './Column'

interface IColumn {
  id: string
  title: string
  cards: ICard[]
}

const INITIAL_COLUMNS: IColumn[] = [
  {
    id: 'col-1',
    title: 'Todo',
    cards: [
      { id: 'card-1', title: 'Setup project', details: 'Initialize repo and dependencies' },
      { id: 'card-2', title: 'Design mockups', details: 'Create wireframes and UI mockups' },
    ],
  },
  {
    id: 'col-2',
    title: 'In Progress',
    cards: [
      { id: 'card-3', title: 'Build components', details: 'Implement Card and Column components' },
      { id: 'card-4', title: 'Add drag and drop', details: '' },
    ],
  },
  {
    id: 'col-3',
    title: 'Review',
    cards: [
      { id: 'card-5', title: 'Code review', details: 'Review pull request' },
    ],
  },
  {
    id: 'col-4',
    title: 'Done',
    cards: [
      { id: 'card-6', title: 'Setup styling', details: 'Define color scheme and global styles' },
      { id: 'card-7', title: 'Write tests', details: '' },
    ],
  },
  {
    id: 'col-5',
    title: 'Backlog',
    cards: [
      { id: 'card-8', title: 'Add search feature', details: 'Search cards by title' },
      { id: 'card-9', title: 'Add filters', details: 'Filter by priority or assignee' },
    ],
  },
]

export default function Board() {
  const [columns, setColumns] = useState<IColumn[]>(INITIAL_COLUMNS)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [autoEditCardId, setAutoEditCardId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      distance: 8,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // If same item dropped on itself, do nothing
    if (activeId === overId) return

    // Check if it's a column being dragged
    const activeColumn = columns.find((col) => col.id === activeId)
    if (activeColumn) {
      const activeIdx = columns.findIndex((col) => col.id === activeId)
      const overIdx = columns.findIndex((col) => col.id === overId)

      if (overIdx !== -1) {
        // Reorder columns
        const newColumns = [...columns]
        const [removed] = newColumns.splice(activeIdx, 1)
        newColumns.splice(overIdx, 0, removed)
        setColumns(newColumns)
        return
      }
    }

    // It's a card being dragged
    let sourceColId: string | null = null
    let cardIndex = -1

    for (const col of columns) {
      const idx = col.cards.findIndex((card) => card.id === activeId)
      if (idx !== -1) {
        sourceColId = col.id
        cardIndex = idx
        break
      }
    }

    if (!sourceColId) return

    // Find target column
    let targetColId: string | null = null

    // Check if dropping on a card
    for (const col of columns) {
      const cardIdx = col.cards.findIndex((card) => card.id === overId)
      if (cardIdx !== -1) {
        targetColId = col.id
        break
      }
    }

    // Check if dropping on a column
    if (!targetColId && columns.find((col) => col.id === overId)) {
      targetColId = overId
    }

    if (!targetColId) return

    // If same column, do nothing
    if (sourceColId === targetColId) return

    // Move card to target column
    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((col) => ({
        ...col,
        cards: [...col.cards],
      }))

      const sourceCol = newColumns.find((col) => col.id === sourceColId)!
      const [card] = sourceCol.cards.splice(cardIndex, 1)

      const targetCol = newColumns.find((col) => col.id === targetColId)!
      targetCol.cards.push(card)

      return newColumns
    })
  }

  const addCard = (colId: string) => {
    const newCardId = `card-${Date.now()}`
    setAutoEditCardId(newCardId)

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === colId
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: newCardId, title: '', details: '' },
              ],
            }
          : col
      )
    )
  }

  const deleteCard = (colId: string, cardId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === colId
          ? {
              ...col,
              cards: col.cards.filter((card) => card.id !== cardId),
            }
          : col
      )
    )
  }

  const updateCard = (
    colId: string,
    cardId: string,
    updates: Partial<ICard>
  ) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === colId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, ...updates } : card
              ),
            }
          : col
      )
    )

    // Clear auto-edit when card is saved
    if (autoEditCardId === cardId) {
      setAutoEditCardId(null)
    }
  }

  const renameColumn = (colId: string, newTitle: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === colId ? { ...col, title: newTitle } : col
      )
    )
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board">
        {columns.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            cards={col.cards}
            onAddCard={addCard}
            onDeleteCard={deleteCard}
            onUpdateCard={updateCard}
            onRenameColumn={renameColumn}
            autoEditCardId={autoEditCardId}
          />
        ))}
      </div>
    </DndContext>
  )
}
