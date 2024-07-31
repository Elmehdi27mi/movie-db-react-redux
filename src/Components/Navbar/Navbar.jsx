import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({logOut,userData}) {
  return <>
  <nav className="p-2 d-flex flex-md-row flex-column  justify-content-between ">
    <div className="left-nav d-flex flex-md-row flex-column align-items-center ">
        <h1 className='pe-3 m-0'>Noxe</h1>
        {userData ? <ul className='list-unstyled d-flex flex-md-row flex-column align-content-center m-0'>
            <li className='px-2 pb-1'><Link to='/'>Home</Link></li>
            <li className='px-2 pb-1'><Link to='movie'>Movies</Link></li>
            <li className='px-2 pb-1'><Link to='tv'>Tv show</Link></li>
            <li className='px-2 pb-1'><Link to='people'>People</Link></li>
            <li className='px-2 pb-1'><Link to='/'>About</Link></li>
            <li className='px-2 pb-1'><Link to='/'>Networks</Link></li>
        </ul>:''}
    </div>
    <div className="right-nav d-flex flex-md-row flex-column align-items-center   ">
        <div className="social-media d-flex flex-md-row flex-column me-2">
            <i className='fab llink cursor-pointer fa-facebook '></i>
            <i className='fab llink cursor-pointer fa-spotify '></i>
            <i className='fab llink cursor-pointer fa-instagram '></i>
            <i className='fab llink cursor-pointer fa-youtube'></i>
        </div>
        <ul className='list-unstyled d-flex flex-md-row flex-column align-content-center m-0'>
            {
              userData?  <>
               <li onClick={logOut} className='px-2 cursor-pointer pb-1'><span >LogOut</span></li>
               <li className='px-2 pb-1'><Link to='profile'>Profile</Link></li>
               </>:
               <>
                <li className='px-2 pb-1'><Link to='login'>Login</Link></li>
                <li className='px-2 pb-1'><Link to='register'>Register</Link></li>
               </>
            }
        </ul>
    </div>
  </nav>
  </>
}
