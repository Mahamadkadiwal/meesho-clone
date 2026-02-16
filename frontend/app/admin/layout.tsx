import { ReactNode } from 'react';
import SidebarAdmin from '../_component/Admin/SidebarAdmin';

export default function layout({ children }: { children: ReactNode }) {
    return (
        <>
            <SidebarAdmin />
            <main className='transition-all duration-300 md:pl-60 pl-12 bg-(--bg-color)'>{children}</main>
        </>
    )
}