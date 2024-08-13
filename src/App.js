import './App.css';
import Home from './Components/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
//import {Offline} from 'react-detect-offline'
import Movie from './Components/Movie/Movie';
import Search from './Components/Search/Search'
import People from './Components/People/People';
import Register from './Components/Register/Register';
import { useEffect, useState } from 'react';
import Profile from './Components/Profile/Profile';
import React from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { jwtDecode } from 'jwt-decode';
import Explore from './Components/Explore/Explore';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem('access_token');
   
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken.user); 
   
  }
  let routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        { index: true, element: <ProtectedRoute userData={userData}><Home /></ProtectedRoute> },
        {
          path: '/',
          children:[
            { path: 'tv/:type', element: <ProtectedRoute userData={userData}><Movie mediaType='tv' /></ProtectedRoute> },
           {path: 'movie/:type', element: <ProtectedRoute userData={userData}><Movie mediaType='movie'/></ProtectedRoute>}

          ]
    
        },
        { path: 'explore', element: <ProtectedRoute userData={userData}><Explore /></ProtectedRoute> },
        { path: 'search/:query', element: <ProtectedRoute userData={userData}><Search /></ProtectedRoute> },
        { path: 'people', element: <ProtectedRoute userData={userData}><People /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute userData={userData}><Profile userData={userData} /></ProtectedRoute> },
        { path: 'itemDetails/:id/:media_type', element: <ProtectedRoute userData={userData}><ItemDetails /></ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
      ]
    }
  ]);

  return (
    <>
      <Provider store={store}>
        {/* <div>
          <Offline> <div className='offline d-flex justify-content-center align-items-center'>
            <h3 className='text-light lead px-1'>You are offline</h3>
            <span class="loader"></span>
            </div>
            </Offline>
            
        </div> */}
        <RouterProvider router={routers} />
      </Provider>
    </>
  );
}

export default App;
