import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'A beautiful kanban project management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
