'use client'
import React, { useState } from 'react'

import Settings from './Settings'
import ChangePasswordContainer from './changepassword/ChangePasswordContainer'
import Sidebar from './detailsChange/common/UserSidebar'
import { Button } from '@/components/ui/button'



const SettingsMain = () => {
        const [activeTab, setActiveTab] = useState("Profile")
  return (
       <main className="bg-gray-50 min-h-screen">
      

      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className='flex gap-3 mb-5'>
                <Button className='bg-[#65A30D] cursor-pointer ' onClick={()=>setActiveTab('Profile')}>Profile</Button>
                <Button className='bg-[#65A30D] cursor-pointer ' onClick={()=>setActiveTab('Password')}>Password</Button>

                
            </div>
            {activeTab === "Profile" && <Settings />}
            {activeTab === "Password" && <ChangePasswordContainer />}
     
          </div>
        </div>
      </div>
    </main>
  )
}

export default SettingsMain