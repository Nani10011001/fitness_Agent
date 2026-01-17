import React from 'react'
import NavBar from '../NavBar'
import Layout from '../Layout'
import { Sidebar } from 'lucide-react'
import SlideBar from './SlideBar'

const Dashboard_page = () => {
  return (
    <div className='flex justify-between  px-4 py-3'>
      <div>
        <SlideBar/>
      </div>
  <div>
    <Layout/>
  </div>
    </div>
  )
}

export default Dashboard_page
