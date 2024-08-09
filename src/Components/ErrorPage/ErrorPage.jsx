import React from 'react'
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 className='mainColor'>404</h1>
        <p className='mainColor'>Page not found!</p>
        <Link to="/" className='mainColor '>Go back to Home</Link>
      </div>
    );
  }

