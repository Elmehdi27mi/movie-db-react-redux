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

  useEffect(() => {
    console.log('Media Type:', mediaType);
    console.log('Current Page:', currentPage);
    console.log('Total Pages:', totalePages);
    dispatch(getItemsByType({ type, mediaType, page: currentPage }));
  }, [dispatch, type, mediaType, currentPage, totalePages]);
  
  




  return (
    <div className="item container pt-5">
          {/* Affichage du spinner ou des films */}
      {loading ? (
         <div className=" d-flex justify-content-center  align-items-center  vh-100">
         <i className='fas fa-spinner mainColor fa-spin mb-5  fa-4x'></i>
        </div>
      ) : (
        <>
          <div className="row">
            {items && items.slice(0, 18).map((movie, index) => (
              <div key={index} className='col-md-2 d-flex'>
                <SliderItem item={movie} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalePages > 0 && (
            <div className="pagination my-5 w-50 mx-auto">
              <ResponsivePagination
                current={currentPage}
                total={totalePages}
                onPageChange={setCurrentPage}
                className="custom-pagination"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
