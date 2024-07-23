import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({logOut,userData}) {
  return <>
  <nav className="p-2 d-flex flex-md-row flex-column  justify-content-between ">
    <div className="left-nav d-flex flex-md-row flex-column align-items-center ">
        <h1 className='pe-3 m-0'>Noxe</h1>
        {userData ? <ul className='list-unstyled d-flex flex-md-row flex-column align-content-center m-0'>
            <li className='px-2 llink'><Link to='/'>Home</Link></li>
            <li className='px-2 llink'><Link to='movie'>Movies</Link></li>
            <li className='px-2 llink'><Link to='movie'>Movies</Link></li>
            <li className='px-2 llink'><Link to='tv'>Tv show</Link></li>
            <li className='px-2 llink'><Link to='people'>People</Link></li>
            <li className='px-2 llink'><Link to='home'>About</Link></li>
            <li className='px-2 llink'><Link to='home'>Networks</Link></li>
        </ul>:''}
    </div>
    <div className="right-nav d-flex flex-md-row flex-column align-items-center   ">
        <div className="social-media d-flex flex-md-row flex-column me-2">
            <i className='fab mx-1 fa-facebook '></i>
            <i className='fab mx-1 fa-spotify '></i>
            <i className='fab mx-1 fa-instagram '></i>
            <i className='fab mx-1 fa-youtube'></i>
        </div>
        <ul className='list-unstyled d-flex flex-md-row flex-column align-content-center m-0'>
            {
              userData?  <>
               <li onClick={logOut} className='px-2 cursor-pointer'><span >LogOut</span></li>
               <li className='px-2'><Link to='profile'>Profile</Link></li>
               </>:
               <>
                <li className='px-2'><Link to='login'>Login</Link></li>
                <li className='px-2'><Link to='register'>Register</Link></li>
               </>
            }
        </ul>
    </div>
  </nav>
  </>
}
