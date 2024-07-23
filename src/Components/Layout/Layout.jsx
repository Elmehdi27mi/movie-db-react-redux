import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout({setUserData,userData}) {

    let navigate=useNavigate();
    function logOut(){
        setUserData(null);
        navigate('/login');
    }
  return (
    <>
    <Navbar logOut={logOut} userData={userData} />
    <div className="container">
    <Outlet></Outlet>
    </div>
    <Footer/>
    </>
  )
}
