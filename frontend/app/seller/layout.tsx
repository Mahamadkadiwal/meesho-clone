import React, { ReactNode } from 'react'
import Sidebar from '../_component/Seller/Sidebar'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className='transition-all duration-300 md:pl-60 pl-12 bg-(--bg-color)'>{children}</main>
    </>
  )
}
