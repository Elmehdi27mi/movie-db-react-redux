
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SliderItem from '../SliderItem/SliderItem';
import { getPopularMovies } from '../../Redux/moviesslice';
import { useParams } from 'react-router-dom';

export default function Movie() {
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.media.popularMovies); // Accès aux films populaires via Redux
  const { type } = useParams();

  useEffect(() => {
    dispatch(getPopularMovies(type)); // Dispatch l'action pour obtenir les films populaires
  }, [dispatch]);

  return (
    <>
      <div className="row py-5">
        <div className='col-md-3 d-flex'>
          <div>
            <div className="w-25 brdr mb-3"></div>
            <h2 className='h3 mainColor'>Trending <br /> Movies <br /> to watch now</h2>
            <p className='py-2 pr'>Most watched movies by days</p>
            <div className="w-100 brdr mt-3"></div>
          </div>
        </div>
        {popularMovies && popularMovies.map((movie, index) => (
          <div key={index} className='col-md-2 d-flex'>
            <SliderItem item={movie} />
          </div>
        ))}
      </div>
    </>
  );
}
