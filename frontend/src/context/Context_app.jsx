import React from 'react'
import { createContext,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
axios.defaults.baseURL= import.meta.env.VITE_BASE_URL
 const AppContext=createContext()
const Context_app = ({children}) => {
   const navigate=useNavigate()
   
   const value={
    navigate,
    axios
   }
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export default Context_app

export  const useAppContext=()=>{
    return useContext(AppContext)
}
