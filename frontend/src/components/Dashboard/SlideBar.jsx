import React from 'react'
import { NavLink } from 'react-router-dom'
import { SquarePen } from 'lucide-react';
const SlideBar = () => {
  return (
  <div>
  <NavLink
    end={true}
    to="/profile/edit"
    className={({ isActive }) =>
      `text-white flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
        isActive ? "bg-blue-700 border-r-4 border-gray-400" : ""
      }`
    }
  >
    <SquarePen className="min-w-4 w-5" />
    <p className="hidden md:inline-block">Profile</p>
  </NavLink>
</div>

  )
}

export default SlideBar
