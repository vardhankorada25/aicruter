'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

import { Button } from '@/components/ui/button'
import { Plus } from "lucide-react"
import { SidebarOptions } from "@/services/constants"

export function AppSidebar() {
  const path = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center mt-5">
        <Image
          src="/logo1.png"
          alt="logo"
          width={200}
          height={75}
          className="w-[150px] h-[75px]"
        />
        <Button className="w-full mt-5">
          <Plus className="w-4 h-4 mr-2" />
          Create New Interview
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {SidebarOptions.map((option, index) => {
              const isActive = path === option.path
              return (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton asChild className={`p-4 rounded-md  hover:bg-muted ${path==option.path && 'bg-blue-100 hover:bg-blue-100'}`}>
                    <Link href={option.path}>
                      <div className="flex items-center gap-3 text-sm">
                        <option.icon
                          size={18}
                          className={`text-gray-600 ${isActive ? 'text-primary' : ''}`}
                        />
                        <span className={`text-[15px] ${isActive ? 'text-primary font-medium' : ''}`}>
                          {option.name}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
