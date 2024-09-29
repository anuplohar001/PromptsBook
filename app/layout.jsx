import React from 'react'
import '@styles/globals.css'
import Nav from "@components/Nav";
import Provider from '@components/Provider'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster, toast } from 'sonner'

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
            <Toaster position="top-right" richColors />
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
