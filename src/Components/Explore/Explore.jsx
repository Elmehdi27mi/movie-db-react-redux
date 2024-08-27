import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SliderItem from '../SliderItem/SliderItem';
import { getGenreItems, getPopularMovies } from '../../Redux/moviesslice';
import Select from 'react-select';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import SwitchTabs from '../SwitchTabs/SwitchTabs';

export default function Explore() {
  const [sortby, setSortby] = useState(null);
  const [genre, setGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.media.popularMovies);
  const genreItems = useSelector((state) => state.media.genreItems);
  const totalePages = useSelector((state) => state.media.getTotalePage);
  const loading = useSelector((state) => state.media.loading);
  const [mediaType, setMediaType] = useState('movie'); 

  // Mémorisation des données de tri pour éviter les recalculs inutiles
  const sortbyData = useMemo(() => [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    { value: "primary_release_date.desc", label: "Release Date Descending" },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
  ], []);

  // Optimisation des fonctions de gestion des changements avec useCallback
  const onChange = useCallback((selectedItems, action) => {
    if (action.name === "sortby") {
      setSortby(selectedItems);
    } else if (action.name === "genres") {
      setGenre(selectedItems || []);
    }
    setCurrentPage(1); // Revenir à la première page lorsque les filtres changent
  }, []);

  const onTabChange = (tab) => {
    setMediaType(tab === 'Movie' ? 'movie' : 'tv');
  };

  // Utilisation de useEffect pour gérer les appels API
  useEffect(() => {
    const filters = {};

    if (sortby) filters.sort_by = sortby.value;
    if (genre.length > 0) filters.with_genres = genre.map((g) => g.id).join(',');

    dispatch(getPopularMovies({ mediaType, page: currentPage, filters }));
  }, [dispatch, currentPage, sortby, genre, mediaType]);

  useEffect(() => {
    // Charger les genres une seule fois au montage du composant
    dispatch(getGenreItems());
  }, [dispatch]);

  return (
    <div className="item container pt-5">
      <div className="d-flex justify-content-between">
        <div className="switch-tabs-container me-1">
            <SwitchTabs data={['Movie', 'Tv']} onTabChange={onTabChange} />
        </div>
        <div className="select d-md-flex mb-3">
          <Select
            name="sortby"
            value={sortby}
            options={sortbyData}
            onChange={onChange}
            isClearable={true}
            placeholder="Sort by"
            className="react-select-container me-1 mb-2 "
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

      {/* Affichage du spinner ou des films */}
      {loading ? (
        <div className=" d-flex justify-content-center align-items-center vh-100">
         <i className='fas fa-spinner  mb-5 fa-spin fa-4x'></i>
        </div>
      ) : (
        <>
          <div className="row">
            {popularMovies && popularMovies.length > 0 && popularMovies.slice(0, 18).map((movie, index) => (
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
