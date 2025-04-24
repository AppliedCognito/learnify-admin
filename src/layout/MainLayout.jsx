import AppSidebar from '@/components/AppSidebar'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarInset, SidebarProvider, SidebarSeparator, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {

  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
        <main>
          <header className='h-16 w-full'>
            <div className="h-8 w-full flex items-center">
              <SidebarTrigger/>
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  {pathnames.map((segment, index) => {
                    const to = '/' + pathnames.slice(0, index + 1).join('/')
                    const isLast = index === pathnames.length - 1
                    return (
                      <React.Fragment key={to}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>
                              {segment.charAt(0).toUpperCase() + segment.slice(1)}
                            </BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link to={to}>
                                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                              </Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
            <Outlet/>
        </main>
        </SidebarInset>

    </SidebarProvider>
  )
}

export default MainLayout