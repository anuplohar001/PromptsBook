import React from 'react'
import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from '@components/Provider'
import Head from 'next/head';
import icon from '@public/assets/icon.svg'

export const metadata = {
  title: 'PromptsBook',
  description: 'Discover & Share AI prompts'
}

function RootComponent({ children }) {
  return (
    <html>
      <body>
        <Provider>
          <main>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootComponent
