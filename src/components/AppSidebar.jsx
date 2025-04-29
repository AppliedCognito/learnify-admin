import { BookOpen, Calendar, ChartColumn, FileQuestion, GalleryVerticalEnd, Inbox, LayoutDashboard, Medal, Search, Settings, UsersRound } from "lucide-react"
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from './ui/sidebar'
import LearnifyLogo from '@/assets/logo/logo.png';
import { NavUser } from "./NavUser";


// Menu items.
const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Content",
      url: "/content",
      icon: BookOpen,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersRound ,
    },
    {
      title: "Quizzes",
      url: "/quiz",
      icon: FileQuestion,
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: Medal,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: ChartColumn,
    },
    
  ]

  const user= {
    name: "rafsal",
    email: "m@example.com",
    avatar: "https://avatars.githubusercontent.com/u/31894153?v=4",
  }

const AppSidebar = () => {
  return (
    <Sidebar variant="inset"  collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                <a href="#">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <img sizes="4" src={LearnifyLogo} alt="LearnifyLogo" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-bold text-[#4F3FFF] text-md">Learnify</span>
                    <span className="text-[12px]">Learning App</span>
                    </div>
                </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator/>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>

            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar