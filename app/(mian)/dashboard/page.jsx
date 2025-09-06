// "use client";  
import React from 'react'

import CreateOptions from './_components/CreateOptions';
import LatestInterviewList from './_components/LatestInterviewList';

import { useUser } from '@/app/provider';
  function Dashboard() {
  return (
    <div>
         {/* <WelcomeContainer />   */}
         <h2 className='my-3 font-bold text-xl'>Dashboard</h2> 
         <CreateOptions />
         <LatestInterviewList />
    </div>
  )
}

export default Dashboard