"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image'; // Added missing import
import React from 'react';

function WelcomeContainer() {
  const {user}=useUser();
  return (
    <div className='max-w-4xl mx-auto'> {/* Container with max width and center alignment */}
      <div className='bg-white p-6 rounded-2xl flex items-center justify-between shadow-sm border'>
        <div>
          <h2 className='text-lg font-bold'>Welcome back, {user?.name}</h2>
          <h2 className='text-gray-500'>AI-driven interviews, Hassle-Free Hiring</h2>
        </div>
       {user &&<Image src={user?.picture } alt='useravtar' width={40} height={40} className="rounded-full"/>}
      </div>
    </div>
  );
}

export default WelcomeContainer;
      