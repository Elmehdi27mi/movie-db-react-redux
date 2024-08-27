import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import CircularChart from '../CircularChart/CircularChart';
import SliderItem from '../SliderItem/SliderItem';
import playIcon from '../../assets/image_play.png'; // Icône de lecture personnalisée

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Swiper modules
import { Scrollbar, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { getCast, getDetailsFilm, getRelatedMovies, getTrailers } from '../../Redux/moviesslice';

export default function ItemDetails() {
  const dispatch = useDispatch();
  const { id, media_type } = useParams();
  const itemDetails = useSelector((state) => state.media.itemDetails);
  const relatedMovies= useSelector((state) => state.media.relatedMovies);
  const cast  = useSelector((state) => state.media.cast); 
  const trailers = useSelector((state) => state.media.trailers); 
  const loading = useSelector((state) => state.media.loading);
  const votePercentage = itemDetails.vote_average ? (itemDetails.vote_average * 10) : 0;

  let circleColor = 'blue';
  if (votePercentage < 50) {
    circleColor = 'orange';
  } else if (votePercentage < 75) {
    circleColor = 'green';
  }

 

  useEffect(() => {
    dispatch(getDetailsFilm({ id, media_type }));
    dispatch(getRelatedMovies({ id, media_type }));
    dispatch(getCast({ id, media_type }));
    dispatch(getTrailers({ id, media_type }));
  }, [dispatch, id, media_type]);
  

  // Construire le chemin de l'image
  const imagePath = itemDetails.poster_path 
    ? "https://image.tmdb.org/t/p/w500/" + itemDetails.poster_path 
    : "https://image.tmdb.org/t/p/w500/" + itemDetails.profile_path;

  const backdropPath = itemDetails.backdrop_path
    ? "https://image.tmdb.org/t/p/w500/" + itemDetails.backdrop_path
    : null;

  return (
    <>
      <Helmet>
        <meta charSet='utf-8'/>
        <title>{itemDetails.title || itemDetails.name}</title>
      </Helmet>
      <div className="position-relative image-container" style={{ backgroundImage: `url(${backdropPath})` }}>
        <div className="detail row y-5 padd mt-5">
          <div className="col-xxl-3 col-xl-4 col-lg-5 col-sm-6 ">
            <img className="img-fluid rounded me-2" src={imagePath} alt="" />
          </div>
          <div className="col-xxl-8 col-xl-7 col-lg-6 col-sm-6">
            <div>
              <h3 className="mb-2 text-light mt-sm-0 mt-3 ">{itemDetails.title || itemDetails.name}</h3>
              <p className="text-light">{itemDetails.tagline}</p>
              <div className="type d-flex">
                {itemDetails.genres?.map((g, index) => (
                  <p key={index} className="text-light genre p-1 rounded-1 me-1">
                    {g.name}
                  </p>
                ))}
              </div>

              <div className="d-flex   mt-1">
                <button className="btn btn-outline-secondary me-2">
                  <i className="fa-solid fa-bookmark"></i>
                </button>
                <button className="btn btn-outline-danger me-4">
                  <i className="fa-solid fa-heart"></i>
                </button>
                {trailers.length > 0 && (
                  <a href={`https://www.youtube.com/watch?v=${trailers[0].key}`} target="_blank" rel="noopener noreferrer" className="btnn d-flex justify-content-center align-items-center" >
                    <i className="fa-solid fa-play me-2 "></i><span > Trailer</span>
                  </a>
                )}
              </div>
              {itemDetails.vote_average && (
                <div className="vote-circle my-2  ">
                  <CircularChart percentage={votePercentage} color={circleColor} />
                </div>
              )}
              <p className="py-1 text-style text-light">Vote count: {itemDetails.vote_count}</p>
              <p className="py-1 text-style text-light">Popularity: {itemDetails.popularity}</p>
              <p className="py-1 text-style text-light">Release date: {itemDetails.release_date}</p>
              <p className="py-1 text-light">Overview: {itemDetails.overview}</p>
            </div>
          </div>
        </div>

        {/* Afficher le casting */}
        <div className="cast-section w-75 mx-auto mt-5 mb-5">
          <div className='w-75 mx-auto'>
          <h3 className='text-light fw-bolder mb-4'>Top Cast</h3>
          <Swiper
            modules={[Scrollbar, Pagination]}
            spaceBetween={0} // Ajuster l'espacement entre les éléments
            slidesPerView={8}
            scrollbar={{ draggable: true }}
            breakpoints={{
              320: { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
            }}
          >
            {cast.map((actor) => (
              actor.profile_path && (
                <SwiperSlide key={actor.id}>
                  <div className="text-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded-circle mb-2"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }} 
                    />
                    <h5 className="fw-bold text-light font-secondary">{actor.name}</h5>
                    <p className="text-light font-secondary mb-5">as {actor.character}</p>
                  </div>
                </SwiperSlide>
              )
            ))}
          </Swiper>
        </div>
        </div>
      </div>

      {/* Ajouter un conteneur pour les vidéos et les deux images */}
      <div className="media-wrapper w-75 mx-auto" >
        <h4 className='mainColor mb-3 mt-5 fw-bolder'>Most Popular</h4>
        <Swiper
          modules={[Scrollbar, Pagination]}
          spaceBetween={10} // Ajuster l'espacement entre les éléments
          slidesPerView={2}
          scrollbar={{ draggable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1200: { slidesPerView: 3},
          }}
        >
          {/* Afficher les bandes-annonces */}
          {trailers.map((item, index) => (
            <SwiperSlide key={index} className="d-flex justify-content-center mb-4 align-items-center">
              <div className="media-item" style={{ position: 'relative', width: '400px', height: '200px' }}>
                {item.key && item.site === 'YouTube' ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                      alt={`Video thumbnail of ${item.name}`}
                      className="img-fluid rounded-2"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="play-button position-absolute top-50 start-50 translate-middle">
                      <a
                        href={`https://www.youtube.com/watch?v=${item.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={playIcon} alt="Play" style={{ width: '50px', height: '50px' }} />
                      </a>
                    </div>
                  </>
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.file_path}`}
                    alt={`Image ${item.file_path}`}
                    className="img-fluid rounded-2"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}

          {/* Afficher les images sélectionnées */}
          {backdropPath && (
            <SwiperSlide key="backdrop">
              <div className="media-item">
                <img
                  src={backdropPath}
                  alt={`Backdrop of ${itemDetails.title || itemDetails.name}`}
                  className="rounded-2"
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />
              </div>
            </SwiperSlide>
          )}

          {imagePath && (
            <SwiperSlide key="poster">
              <div className="media-item">
                <img
                  src={imagePath}
                  alt={`Poster of ${itemDetails.title || itemDetails.name}`}
                  className="img-fluid rounded-2"
                  style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* Ajouter un conteneur pour le carousel des recommandations */}
      <div className="m-5  carousel-wrapper">
        <h4 className='mainColor m-3 fw-bolder'>Recommendations</h4>
        <Swiper
          modules={[ Scrollbar, Pagination]}
          spaceBetween={12} // Ajuster l'espacement entre les éléments
          slidesPerView={8}
          scrollbar={{ draggable: true }}

          loop={true}
          breakpoints={{
            320: { slidesPerView:  2},
            450: { slidesPerView: 3 },
            600: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1200: { slidesPerView: 7 },
            1450: { slidesPerView: 8 },
            2000: { slidesPerView: 10 },
          }}
        >
          {relatedMovies.map((movie, index) => (
            movie.poster_path && movie.vote_average &&(
              <SwiperSlide key={index}>
                <SliderItem item={movie} loading={loading} />
              </SwiperSlide>
            )
          ))}
        </Swiper>
      </div>
    </>
  );
}
