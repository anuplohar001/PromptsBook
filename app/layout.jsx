import React from 'react'
import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from '@components/Provider'
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  title: 'PromptsBook',
  description: 'Discover & Share AI prompts'
}

function RootComponent({ children }) {
  return (
    <html>
      <body>
        <Provider>
          <main className='flex'>
            <Nav />           
            {children}
          </main>
          <SpeedInsights/>
        </Provider>
      </body>
    </html>
  )
}

export default RootComponent
