import React from 'react'
import { Route,Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './components/Authication/Login'
import Signup from './components/Authication/Signup'
import  {Toaster}  from 'react-hot-toast'
import Profile from './components/Authication/Profile'
import Fitness_Agent from './pages/Fitness_Agent'
import Dashboard_page from './components/Dashboard/Dashboard_page.jsx'
import userProgress from './components/Dashboard/Progress_details.jsx'
import Profile_edit from './components/Dashboard/Profile_edit.jsx'

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
'> 
<Toaster/>
<Routes>
  <Route path='/' element={<Home/>}/>

  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path="/profile" element={<Profile/>}/>
  <Route path="/Agent/ui" element={<Fitness_Agent/>}/>
  <Route  path='/dashboard' element={<Dashboard_page/>}/>
  <Route index  path="/profile/edit" element={<Profile_edit/>}/>
  <Route path='progress' element={<userProgress/>}/>
</Routes>
      <Toaster/>
      
    </div>
  )
}

export default App
