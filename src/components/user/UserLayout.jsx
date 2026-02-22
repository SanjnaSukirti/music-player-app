import React from 'react'
import UserSidebar from './UserSidebar'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='flex h-[calc(100vh-70px)] bg-slate-900'>
      <UserSidebar/>
      <Outlet/>
    </div>
  )
}

export default UserLayout
