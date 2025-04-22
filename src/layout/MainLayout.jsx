import AppSidebar from '@/components/AppSidebar'
import { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
        <main>
          <SidebarTrigger/>
            <Outlet/>
        </main>
        </SidebarInset>

    </SidebarProvider>
  )
}

export default MainLayout