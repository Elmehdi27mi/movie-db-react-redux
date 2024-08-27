import React from 'react';
import { Link } from 'react-router-dom';
import CircularChart from '../CircularChart/CircularChart';
import noPoster from '../../assets/no-poster.png';
import loadingImage from '../../assets/placeholder1.png'; // Importer l'image
import Skeleton from '@mui/material/Skeleton'; // Importer Skeleton de MUI

export default function SliderItem({ item, loading }) {
  const votePercentage = item.vote_average ? (item.vote_average / 10) * 100 : "";

  // Déterminer la couleur du cercle en fonction du pourcentage
  let circleColor = 'blue';
  if (votePercentage < 50) {
    circleColor = 'orange';
  } else if (votePercentage < 75) {
    circleColor = 'green';
  }

  return (
    <div className="w-100">
      {loading ? (
        <div className="position-relative mb-5">
          {/* Affichage de l'image de chargement */}
          <div className=" position-relative">
          <img
            src={loadingImage}
            alt="Loading"
            className="w-100 rounded-2 "
          />
                <div className="vote-circle position-absolute">
                  <CircularChart percentage={0} color={circleColor} />
                </div>
                </div>
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
          <div className="movie">
                    <Link to={`/itemDetails/${item.id}/${item.media_type}`}>

            <div className="container-img-vote position-relative">
              <img
                className="w-100 rounded-2"
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : noPoster}
                alt={item.title || item.name}
              />
              {item.vote_average && (
                <div className="vote-circle position-absolute">
                  <CircularChart percentage={votePercentage} color={circleColor} />
                </div>
              )}
            </div>
            </Link>
            <p className="mt-4 mainColor fw-bolder font-secondary">{item.title || item.name}</p>

          </div>
       
      )}
    </div>
  );
}
