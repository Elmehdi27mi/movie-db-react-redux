import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import axios from 'axios';
import { selectIsDarkMode } from '../../Redux/moviesslice';
import { useSelector } from 'react-redux';

export default function Layout({setUserData,userData}) {
  const isDarkMode = useSelector(selectIsDarkMode);
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
<div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
    <Navbar logOut={logOut} userData={userData} />
    <div >
    <Outlet></Outlet>
    </div>
    <Footer userData={userData}/>
    </div>
    </>
  )
}
