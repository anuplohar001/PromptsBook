import React from 'react'
import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from '@components/Provider'

export const metadata = {
  title: 'PromptsBook',
  description: 'Discover & Share AI prompts'
}

function RootComponent({ children }) {
  return (
    <html>
      <body className='main gradient'>
        <Provider>
          <main className='w-full'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootComponent
