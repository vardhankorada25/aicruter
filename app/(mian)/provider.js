"use client";
import React from 'react'
import { SidebarProvider, SidebarTrigger }from "@/components/ui/sidebar";
import {AppSidebar} from './_components/AppSidebar.jsx';
import WelcomeContainer from './dashboard/_components/welcomeContainer';
function DashboardProvider({children}) {
  return (
    <SidebarProvider>
       <AppSidebar />
        <div className='w-full'>
            <SidebarTrigger />
            <WelcomeContainer /> 
        {children}
        </div>
    </SidebarProvider>
  )
}
import App from 'next/app';

export default DashboardProvider
