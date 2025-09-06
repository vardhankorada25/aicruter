import { Phone, Video } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
function CreateOptions() {
  return (
    <div className='grid grid-cols-2 gap-4'>
        <Link  href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-4 cursor-pointer '> 
            <Video className='p-1.5 text-primary bg-blue-50 rounded-md h-8 w-8 mb-2' />
            <h2 className='font-semibold text-base mb-1'>Create New Interview</h2>
            <p className='text-gray-600 text-sm'>Create AI interviews and schedule with Candidates</p>
        </Link>
        <div className='bg-white border border-gray-200 rounded-lg p-4'>
            <Phone className='p-1.5 text-primary bg-blue-50 rounded-md h-8 w-8 mb-2' />
            <h2 className='font-semibold text-base mb-1'>Create Phone Screening</h2>
            <p className='text-gray-600 text-sm'>Schedule phone screening with candidates</p>
        </div>
    </div>
  )
}
export default CreateOptions
