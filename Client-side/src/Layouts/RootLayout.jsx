import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <React.Fragment>
        <Navbar/>
        <Outlet/>
    </React.Fragment>
  )
}

export default RootLayout
