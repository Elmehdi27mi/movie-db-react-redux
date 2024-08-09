import React from 'react';
import { Link } from 'react-router-dom';
import CircularChart from '../CircularChart/CircularChart';

export default function SliderItem({ item }) {
  const votePercentage = item.vote_average ? (item.vote_average / 10) * 100 : 0;


  // Déterminer la couleur du cercle en fonction du pourcentage
  let circleColor = 'blue';
  if (votePercentage < 50) {
    circleColor = 'orange';
  } else if (votePercentage < 75) {
    circleColor = 'green';
  }

  return (
    <div className="px-2 w-100 ">
      <Link to={`/itemDetails/${item.id}/${item.media_type}`}>
        <div className="movie">
          <div className="container-img-vote position-relative">

          
          {item.poster_path ? (
            <img
              className="w-100 rounded-2"
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title || item.name}
            />
          ) : (
            <img
              className="w-100 rounded-2"
              src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
              alt={item.title || item.name}
            />
          )}
          {item.vote_average && (
            <div className="vote-circle position-absolute">
              <CircularChart percentage={votePercentage} color={circleColor} />
            </div>
          )}
          </div>
          <div className=" ">
          <p className=" mt-4 mainColor fw-bolder">{item.title || item.name}</p>
          </div>

          
        </div>
      </Link>
    </div>
  );
}
