import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import axios from 'axios';

export default function Layout({setUserData,userData}) {

    let navigate=useNavigate();
    function logOut(){
      logoutFromBack();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
        setUserData(null);
        navigate('/login');
    }
    async function logoutFromBack(){
      let {data} = await axios.get('http://localhost:8080/logout',{ Authorization: `Bearer ${localStorage.getItem('access_token')}`});
      console.log(data);
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
