import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SliderItem from '../SliderItem/SliderItem';
import { getItemsByType } from '../../Redux/moviesslice';
import { useParams } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function Movie({mediaType}) {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.media.itemsByType);
  const totalePages = useSelector((state) => state.media.getTotalePage);
  const loading = useSelector((state) => state.media.loading); // Accéder à l'état de chargement
  const{type}= useParams();
const [title,setTitle]=useState("");
  useEffect(() => {
    dispatch(getItemsByType({ type, mediaType, page: currentPage }));
    afficheTitle(type);
  }, [dispatch, type, mediaType, currentPage, totalePages]);
  
  

const afficheTitle=(type)=>{

  if(type==="now_playing")
    setTitle("Now Playing")

  if(type==="upcoming")
    setTitle("Upcoming")

  if(type==="top_rated")
    setTitle("Top Rated")

  if(type==="popular")
    setTitle("Popular")
  if(type==="airing_today")
    setTitle("Airing Today")
  
  if(type==="on_the_air")
    setTitle("On Tv")

  if(type==="airing_today")
    setTitle("Airing Today")

   
}


  return (
    <div className="item container pt-5">
      <div className="title">
        <h3 className='mb-2 mainColor'>{title}</h3>
      </div>
          {/* Affichage du spinner ou des films */}
      {loading ? (
         <div className=" d-flex justify-content-center  align-items-center  vh-100">
         <i className='fas fa-spinner  fa-spin mb-5  fa-4x'></i>
        </div>
      ) : (
        <>
          <div className="row">
            {items && items.slice(0, 18).map((movie, index) => (
              <div key={index} className='col-md-2 d-flex col-sm-3'>
                <SliderItem item={movie} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalePages > 0 && (
          <div className='w-100 d-flex justify-content-center'>
            <div className=" my-5 w-50">
              <div className='w-75 mx-auto'>
                <ResponsivePagination
                  current={currentPage}
                  total={totalePages}
                  onPageChange={setCurrentPage}
                  className="custom-pagination d-flex list-unstyled justify-content-center "
                />
                </div>
            </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
