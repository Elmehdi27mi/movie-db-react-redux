import React from 'react';
import loadingImage from '../../assets/placeholder1.png'; // Importer l'image
import Skeleton from '@mui/material/Skeleton'; // Importer Skeleton de MUI
import { Link } from 'react-router-dom';

export default function PersonSlider({ item , loading }) {


  return (
    
    <div className="w-100">
      {loading ? (
         <div className="position-relative mb-5">
         {/* Affichage de l'image de chargement */}
         <img
           src={loadingImage}
           alt="Loading"
           className="w-100 rounded-2 "
         />
             
         {/* Skeleton overlay pour l'effet wave */}
         <Skeleton
           variant="rectangular"
           width="100%"
           height="100%"
           className="position-absolute top-0 start-0 rounded-2"
           animation="wave"
           style={{ backgroundColor: 'transparent' }} // Overlay transparent
         />
         {/* Skeleton pour le titre */}
         <Skeleton
           variant="text"
           width={120}
           height={50}
           className="mt-3"
           animation="wave"
         />
       </div>
     
      ) : (     
       item && item.profile_path && <div className="person mb-3">
                <Link to={`/peopleDetails/${item.id}`}>

          <div className="container-img-vote position-relative">
            <img
              className="w-100 "
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              alt={item.title || item.name}
            />
          </div>
          </Link>
          <div className='card rounded-0'>
                <div className='ms-2 person-details'>
                    <p className="fs-0 ">{item.name}</p>
                </div>
                </div>
          </div>
        )}
    </div>
  );
}
