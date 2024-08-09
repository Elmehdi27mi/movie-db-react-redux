import React from 'react';

export default function PersonSlider({ item }) {


  return (
        <div className="person mb-3">
          <div className="container-img-vote position-relative">
            <img
              className="w-100 "
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              alt={item.title || item.name}
            />
          </div>
          <div className='card rounded-0'>
                <div className='ms-2 person-details'>
                    <p className="fs-0">{item.name}</p>
                </div>
                </div>
          </div>
    
  );
}
