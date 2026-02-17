import React, { ReactNode } from 'react'
import Header from '../_component/User/Header'

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Header />

            <main>  
                {children}
            </main>
        </>
    )
}
