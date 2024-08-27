import React from 'react';
import { Link } from 'react-router-dom';
import './navbar-1.css';
import { selectIsDarkMode, toggleTheme } from '../../Redux/moviesslice';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar({ logOut, userData }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <>
      <nav className={`navbar navbar-expand-md p-2 d-flex flex-column flex-md-row justify-content-between align-items-center bgNavFtr bsb-navbar bsb-navbar-hover bsb-navbar-caret `}>
        <div className="left-nav d-flex flex-column flex-md-row align-items-center">
          <h1 className="pe-3 m-0">Noxe</h1>
          {userData ? (
            <ul className="list-unstyled d-flex flex-column flex-md-row align-items-center m-0 me-3">
              <li className="px-2 pb-1">
                <Link to="/">Home</Link>
              </li>
              <li className="px-2 dropdown">
                <Link to="movie" className="nav-link" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Movies
                </Link>
                <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
                  <li><Link className="dropdown-item slink" to="movie/popular">Popular</Link></li>
                  <li><Link className="dropdown-item slink" to="movie/now_playing">Now Playing</Link></li>
                  <li><Link className="dropdown-item slink" to="movie/upcoming">Upcoming</Link></li>
                  <li><Link className="dropdown-item slink" to="movie/top_rated">Top Rated</Link></li>
                </ul>
              </li>
              <li className="px-2 dropdown">
                <Link to="tv" className="nav-link" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  TV Shows
                </Link>
                <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
                  <li><Link className="dropdown-item slink" to="tv/popular">Popular</Link></li>
                  <li><Link className="dropdown-item slink" to="tv/airing_today">Airing Today</Link></li>
                  <li><Link className="dropdown-item slink" to="tv/on_the_air">On Tv</Link></li>
                  <li><Link className="dropdown-item slink" to="tv/top_rated">Top Rated</Link></li>
                </ul>
              </li>
              <li className="px-2 pb-1">
                <Link to="people">People</Link>
              </li>
              <li className="px-2 pb-1">
                <Link to="explore">Explore</Link>
              </li>
            </ul>
          ) : (
            ''
          )}
        </div>
        <div className="right-nav d-flex flex-column flex-md-row align-items-center mt-2 mt-md-0">
          <div className="social-media d-flex flex-row me-2">
            <div className="checkbox-wrapper-5 mt-1 me-2">
            <div className="check">
                <input id="check-5" type="checkbox" onChange={handleThemeToggle} checked={isDarkMode} />
                <label htmlFor="check-5" />
              </div>
            </div>
            <i className="fa-solid llink cursor-pointer  fa-heart"></i> 
            <i className="fa-solid llink cursor-pointer  fa-bookmark"></i>
          </div>
          <ul className="list-unstyled  d-flex flex-column flex-md-row align-items-center m-0">
            {userData ? (
              <>
                <li onClick={logOut} className="pe-2 px-md-2 m-0  cursor-pointer pb-1">
                  {/* <span>LogOut</span> */}
                  <Link>LogOut</Link>
                </li>
                <li className="pe-2  px-md-2  pb-1">
                  <Link to="profile">Profile</Link>
                </li>
              </>
            ) : (
              <>
                <li className="pe-2  px-md-2 pb-1">
                  <Link to="login">Login</Link>
                </li>
                <li className="pe-2  px-md-2 pb-1">
                  <Link to="register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}









































// // Components/Navbar/Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import './navbar-1.css';
// import { selectIsDarkMode, toggleTheme } from '../../Redux/moviesslice';

// export default function Navbar({ logOut, userData }) {
//   const dispatch = useDispatch();
//   const isDarkMode = useSelector(selectIsDarkMode);

//   const handleThemeToggle = () => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <>
//       <nav className={`navbar navbar-expand-md p-2 d-flex flex-column flex-md-row justify-content-between align-items-center ${isDarkMode ? 'bgNav' : 'bg-light'}`}>
//         <div className="left-nav d-flex flex-column flex-md-row align-items-center">
//           <h1 className="pe-3 m-0">Noxe</h1>
//           {userData ? (
//            <ul className="list-unstyled d-flex flex-column flex-md-row align-items-center m-0 me-3">
//            <li className="px-2 pb-1">
//              <Link to="/">Home</Link>
//            </li>
//            <li className="px-2 dropdown">
//              <Link to="movie" className="nav-link" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                Movies
//              </Link>
//              <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
//                <li><Link className="dropdown-item" to="movie/popular">Popular</Link></li>
//                <li><Link className="dropdown-item" to="movie/now_playing">Now Playing</Link></li>
//                <li><Link className="dropdown-item" to="movie/upcoming">Upcoming</Link></li>
//                <li><Link className="dropdown-item" to="movie/top_rated">Top Rated</Link></li>
//              </ul>
//            </li>
//            <li className="px-2 dropdown">
//              <Link to="tv" className="nav-link" id="accountDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                TV Shows
//              </Link>
//              <ul className="dropdown-menu border-0 shadow bsb-zoomIn" aria-labelledby="accountDropdown">
//                <li><Link className="dropdown-item" to="tv/popular">Popular</Link></li>
//                <li><Link className="dropdown-item" to="tv/airing_today">Airing Today</Link></li>
//                <li><Link className="dropdown-item" to="tv/on_the_air">On Tv</Link></li>
//                <li><Link className="dropdown-item" to="tv/top_rated">Top Rated</Link></li>
//              </ul>
//            </li>
//            <li className="px-2 pb-1">
//              <Link to="people">People</Link>
//            </li>
//            <li className="px-2 pb-1">
//              <Link to="explore">Explore</Link>
//            </li>
//          </ul>
//           ) : ''}
//         </div>
//         <div className="right-nav d-flex flex-column flex-md-row align-items-center mt-2 mt-md-0">
//           <div className="social-media d-flex flex-row me-2">
//             <div className="checkbox-wrapper-5 mt-1 me-2">
//               <div className="check">
//                 <input id="check-5" type="checkbox" onChange={handleThemeToggle} checked={isDarkMode} />
//                 <label htmlFor="check-5" />
//               </div>
//             </div>
//             <i className="fa-solid llink cursor-pointer fa-heart"></i>
//             <i className="fa-solid llink cursor-pointer fa-bookmark"></i>
//           </div>
//           <ul className="list-unstyled d-flex flex-column flex-md-row align-items-center m-0">
//             {userData ? (
//               <>
//                 <li onClick={logOut} className="px-2 cursor-pointer pb-1">
//                   <span>LogOut</span>
//                 </li>
//                 <li className="px-2 pb-1">
//                   <Link to="profile">Profile</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="px-2 pb-1">
//                   <Link to="login">Login</Link>
//                 </li>
//                 <li className="px-2 pb-1">
//                   <Link to="register">Register</Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }
