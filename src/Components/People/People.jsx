import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTrending } from '../../Redux/moviesslice';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import PersonSlider from '../PersonSlider/PersonSlider';


export default function Explore() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const popularPeople = useSelector((state) => state.media.popularPeople);
  const totalePages = useSelector((state) => state.media.getTotalePage);
  const loading = useSelector((state) => state.media.loading);

  useEffect(() => {
    dispatch(getTrending({ mediaType: "person", page: currentPage }));
  }, [dispatch, currentPage]);

 

  return (
    <div className="item container pt-5">
        <div className="title">
        <h3 className='mb-2 mainColor'>Popular People</h3>
      </div>

      {/* Affichage du spinner ou des films */}
      {loading ? (
        <div className=" d-flex justify-content-center align-items-center vh-100">
         <i className='fas fa-spinner  mb-5 fa-spin fa-4x'></i>
        </div>
      ) : (
        <>
          <div className="row">
            {popularPeople && popularPeople.slice(0, 18).map((person, index) => (

                 <div key={index} className='col-md-2 d-flex col-sm-3'>
                <PersonSlider item={person} loading={loading} />
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
