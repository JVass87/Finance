import type { Metadata } from 'next'
import Board from '@/components/Board'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'A beautiful kanban project management app',
}

export default function Home() {
  return <Board />
}
