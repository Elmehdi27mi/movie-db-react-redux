import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SliderItem from '../SliderItem/SliderItem';
import { useParams } from 'react-router-dom';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { getItemsBySearch } from '../../Redux/moviesslice';
import noResults from "../../assets/no-results.png";

export default function Search() {
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.media.itemsBySearch);
    const totalePages = useSelector((state) => state.media.getTotalePage);
    const loading = useSelector((state) => state.media.loading);
    const { query } = useParams();

    useEffect(() => {
        dispatch(getItemsBySearch({ query, page: currentPage }));
    }, [dispatch, query, currentPage]);

    return (
        <div className="item container pt-5">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <i className='fas fa-spinner fa-spin mb-5 fa-4x'></i>
                </div>
            ) : (
                <>
                    {items && items.length > 0 ? (
                        <>
                            <div className="row">
                                {items.slice(0, 18).map((movie, index) => (
                                    <div key={index} className='col-md-2 d-flex'>
                                        <SliderItem item={movie} />
                                    </div>
                                ))}
                            </div>
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
                    ) : (
                        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
                            <img src={noResults} alt="No Results" className='w-50' />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
