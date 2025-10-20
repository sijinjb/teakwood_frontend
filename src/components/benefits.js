import { BanknotesIcon, CheckBadgeIcon, CircleStackIcon, ClockIcon, CogIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Benefits = () => {
  const benefits= [
          {
            "title": "Many choices",
            "icon": Square3Stack3DIcon,
            "description": "Discover a wide range of furniture styles to suit your unique taste and preferences."
          },
          {
            "title": "Affordable Prices",
            "icon": BanknotesIcon,
            "description": "Enjoy quality furniture at pocket-friendly prices that won't break the bank."
          },
          {
            "title": "Timely Delivery",
            "icon": ClockIcon,
            "description": "Rest assured, your furniture will be delivered on time, as promised. "
          },
          {
            "title": "Quality Assurance",
            "icon": CheckBadgeIcon,
            "description": "Our furniture undergoes quality checks to ensure durability and longevity"
          }
        ]
      
      
  return (
    <div className='bg-gray-200'>
    <div className="mx-auto   max-w-7xl py-20 lg:px-8 px-6  ">
       <h2 className="text-xl text-[#0E6B66] font-semibold text-left mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      
      {benefits?.map((item,index)=>{
        return (
            <div  key={index}  className="bg-white rounded-lg p-6 shadow-md ">
      
            <div className='w-10 h-10 rounded-full p-2 gradient text-white'>
            <item.icon className='w-full h-full rounded-full'/>
            </div>

            <h3 className="text-lg font-medium mt-3">{item.title}</h3>
    
            <p className="text-gray-700 text-sm mt-2">{item.description}</p>
          </div>
        )
      })}
         
         
        </div>

    </div>
    </div>
  )
}

export default Benefits