import React from 'react'
import Header from './_components/Header'

export default function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <div className='mx-5 md:mx-20 lg:mx-36'>
      {children}
      </div>
    </div>
  )
}
