import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SliderItem from '../SliderItem/SliderItem';
import { getGenreItems, getPopularMovies } from '../../Redux/moviesslice';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
export default function Movie() {
  const [sortby, setSortby] = useState(null);
  const [genre, setGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  let filters = {};
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.media.popularMovies);
  const genreItems = useSelector((state) => state.media.genreItems);
  const totalePages = useSelector((state) => state.media.getTotalePage);
  const { type } = useParams();

  useEffect(() => {
    dispatch(getPopularMovies({ type: type, page: currentPage })); 
    dispatch(getGenreItems('movies'));
    setSortby(null);
    setGenre([]);
  }, [dispatch, currentPage]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
      if (selectedItems) {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    } else if (action.name === "genres") {
      setGenre(selectedItems);
      if (selectedItems) {
        filters.genres = selectedItems.map((item) => item.value);
      } else {
        delete filters.genres;
      }
    }
  };


  const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ];

  return (
    <div className="item container pt-5">
      <div className="d-flex justify-content-between">
        <p className='mainColor'>Explore Movies</p>
        <div className="select d-sm-flex mb-3">
          <Select
            name="sortby"
            value={sortby}
            options={sortbyData}
            onChange={onChange}
            isClearable={true}
            placeholder="Sort by"
            className="react-select-container me-1"
            classNamePrefix="react-select"
          />
          <Select
            isMulti
            name="genres"
            value={genre}
            closeMenuOnSelect={false}
            options={genreItems}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id.toString()}
            onChange={onChange}
            placeholder="Select genres"
            className="react-select-container genresDD"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      <div className="row">
        {popularMovies && popularMovies.slice(0,18).map((movie, index) => (
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




    </div>
  );
}
