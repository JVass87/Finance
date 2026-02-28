import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Board from '../src/components/Board'

describe('Board Component', () => {
  it('renders board with initial data', () => {
    render(<Board />)
    expect(screen.getByText('Todo')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.getByText('Backlog')).toBeInTheDocument()
  })

  it('renders cards in columns', () => {
    render(<Board />)
    expect(screen.getByText('Setup project')).toBeInTheDocument()
    expect(screen.getByText('Build components')).toBeInTheDocument()
    expect(screen.getByText('Code review')).toBeInTheDocument()
  })

  it('adds a new card when add button is clicked', () => {
    render(<Board />)
    const addButtons = screen.getAllByRole('button', { name: /Add/i })
    fireEvent.click(addButtons[0])
    const input = screen.getByPlaceholderText('Card title')
    expect(input).toBeInTheDocument()
  })

  it('displays edit mode with inputs', () => {
    render(<Board />)
    const addButtons = screen.getAllByRole('button', { name: /Add/i })
    fireEvent.click(addButtons[0])
    expect(screen.getByPlaceholderText('Card title')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Card details (optional)')).toBeInTheDocument()
  })

  it('saves card when save button is clicked', () => {
    render(<Board />)
    const addButtons = screen.getAllByRole('button', { name: /Add/i })
    fireEvent.click(addButtons[0])

    const titleInput = screen.getByPlaceholderText('Card title') as HTMLInputElement
    const detailsInput = screen.getByPlaceholderText('Card details (optional)') as HTMLTextAreaElement

    fireEvent.change(titleInput, { target: { value: 'New Task' } })
    fireEvent.change(detailsInput, { target: { value: 'Task description' } })

    const saveButtons = screen.getAllByRole('button', { name: /Save/i })
    fireEvent.click(saveButtons[0])

    expect(screen.getByText('New Task')).toBeInTheDocument()
  })

  it('cancels edit when cancel button is clicked', () => {
    render(<Board />)
    const addButtons = screen.getAllByRole('button', { name: /Add/i })
    fireEvent.click(addButtons[0])

    const cancelButtons = screen.getAllByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButtons[0])

    expect(screen.queryByPlaceholderText('Card title')).not.toBeInTheDocument()
  })

  it('allows editing existing card', () => {
    render(<Board />)
    const cardTitle = screen.getByText('Setup project')
    fireEvent.doubleClick(cardTitle)

    const titleInput = screen.getByPlaceholderText('Card title') as HTMLInputElement
    expect(titleInput.value).toBe('Setup project')
  })
})
