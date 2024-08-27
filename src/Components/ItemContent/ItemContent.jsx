import React, { useState, useEffect, useCallback } from 'react';
import 'react-multi-carousel/lib/styles.css';
import SliderItem from '../SliderItem/SliderItem';
import SwitchTabs from '../SwitchTabs/SwitchTabs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingAndVideos } from '../../Redux/moviesslice';
import SliderItemVedeos from '../SliderItemVedeos/SliderItemVedeos';

export default function ItemContent({ title, subtitle, mediatype }) {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.media[`${mediatype}Trending`] || []); // Ajout de state dynamique pour 'movieTrending', 'tvTrending'
  const itemsWithVideos = useSelector((state) => state.media[`${mediatype}WithVideos`] || []); // Pour traiter 'itemsWithVideos' séparément pour chaque mediaType
  const [endpoint, setEndpoint] = useState('day');
  const loading = useSelector((state) => state.media.loading);
  useEffect(() => {
    dispatch(fetchTrendingAndVideos({ mediaType: mediatype, endpoint }));
  }, [dispatch, mediatype, endpoint]);

  const onTabChange = useCallback((tab) => {
    setEndpoint(tab === 'Today' ? 'day' : 'week');
  }, []);

  return (
    <>
      <div className="itemcontent">
        <div className="row mb-2 m-0">
          <div className="mb-2 mb-md-0 me-2 me-md-0 col-md-3">
            <div className="w-25 brdr mb-3"></div>
            <h2 className="h3 mainColor">
              Trending <br /> {title} <br />
            </h2>
            <p className="pb-2 pr">Most watched {subtitle} by {endpoint}</p>
            <div className="switch-tabs-container">
              <SwitchTabs data={['Today', 'This Week']} onTabChange={onTabChange} />
            </div>
            <div className="w-100 brdr mt-3"></div>
          </div>

          <div className="col-md-9 ps-md-5 ps-ms-0 p-0">
            <div className="carousel-container px-3">
              <Swiper
                modules={[Scrollbar, Pagination]}
                spaceBetween={14}
                slidesPerView={8}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  320: { slidesPerView: 3 },
                  590: { slidesPerView: 4 },
                  768: { slidesPerView: 3 },
                  900: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                  1450: { slidesPerView: 6 },
                  2000: { slidesPerView: 8 },
                }}
              >
                {trending.map((item, index) => (
                  <SwiperSlide key={index}>
                    <SliderItem key={index} item={item} loading={loading} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mx-md-2 mx-0">
        <Swiper
          modules={[Scrollbar, Pagination]}
          spaceBetween={14}
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
          {itemsWithVideos.map((item, index) =>
            item.videos && item.videos.length > 0 ? (
              <SwiperSlide key={index} className="d-flex justify-content-center align-items-center">
               <SliderItemVedeos  key={index} item={item} loading={loading}/>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </>
  );
}




























// // Import necessary modules
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'react-multi-carousel/lib/styles.css';
// import SliderItem from '../SliderItem/SliderItem'; 
// import playIcon from '../../assets/image_play1.png'; 
// import SwitchTabs from '../SwitchTabs/SwitchTabs';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Scrollbar } from 'swiper/modules';

// const API_KEY = 'b22e299473a6bd3b4ae42b1953fbd4b6';
// const BASE_URL = 'https://api.themoviedb.org/3';

// export default function ItemContent({title, subtitle, mediatype}) {
//   const [Item, setTrendingitems] = useState([]);
//   const [endpoint, setEndpoint] = useState('day'); 

//   // Fetch trending movies and their videos
//   useEffect(() => {
//     const fetchTrendingMovies = async (endpoint) => {
//       try {
//         // Fetch trending movies
//         const { data } = await axios.get(`${BASE_URL}/trending/${mediatype}/${endpoint}?api_key=${API_KEY}`);
//         const movies = data.results || [];
        
//         // Fetch videos for each movie
//         const moviesWithVideos = await Promise.all(
//           movies.map(async (movie) => {
//             const videoData = await axios.get(`${BASE_URL}/${mediatype}/${movie.id}/videos?api_key=${API_KEY}`);
//             return { ...movie, videos: videoData.data.results };
//           })
//         );

//         setTrendingMovies(moviesWithVideos);
//       } catch (error) {
//         console.error('Error fetching trending movies and videos:', error);
//       }
//     };

//     fetchTrendingMovies(endpoint);
//   }, [endpoint]);

//   const onTabChange = (tab) => {
//     setEndpoint(tab === 'Today' ? 'day' : 'week');
//   };

//   return (
//     <>
//     <div className='itemcontent'>
//       {/* Trending Movies Carousel */}
//       <div className="  row  mb-2 m-0">
//       <div className="  mb-2 mb-md-0 me-2 me-md-0  col-md-3">
//             <div className="w-25 brdr mb-3"></div>
//             <h2 className="h3 mainColor">Trending <br /> {title} <br /></h2>
//             <p className="pb-2 pr">Most watched {subtitle} by days</p>
//              <div className="switch-tabs-container">
//                 <SwitchTabs data={['Today', 'This Week']} onTabChange={onTabChange} />
//             </div>
//             <div className="w-100 brdr mt-3"></div>
//             </div>
   
//             <div className='col-md-9  ps-md-5 ps-ms-0  p-0'>
//               <div className="carousel-container px-3 ">    
//                 <Swiper
//                     modules={[Scrollbar, Pagination]}
//                     spaceBetween={14}
//                     slidesPerView={8}
//                     scrollbar={{ draggable: true }}
                
//                     breakpoints={{
//                       320: { slidesPerView:  3},
//                       590: { slidesPerView: 4 },
//                       768: { slidesPerView: 3 },
//                       900: { slidesPerView: 4 },
//                       1200: { slidesPerView: 5 },
//                       1450: { slidesPerView: 6 },
//                       2000: { slidesPerView: 8 },
//                     }}>
//                     {trendingMovies.map((movie, index) => (
//                     <SwiperSlide key={index} >
//                     <SliderItem key={index} item={movie} />
//                     </SwiperSlide>
//                     ))}  
//                 </Swiper>
//             </div>
//             </div>
//         </div>

//       </div>

//       {/* Trending Videos Carousel with Scrollbar */}
//       <div className="mt-4 mx-md-2 mx-0">
//             <Swiper
//                 modules={[Scrollbar, Pagination]}
//                 spaceBetween={14}
//                 slidesPerView={8}
//                 scrollbar={{ draggable: true }}
//                 breakpoints={{
//                 320: { slidesPerView: 1 },
//                 480: { slidesPerView: 2 },
//                 768: { slidesPerView: 3 },
//                 1024: { slidesPerView: 4 },
//                 1200: { slidesPerView: 5 },
//                 }}>
//                 {trendingMovies.map((movie, index) =>
//                 movie.videos && movie.videos.length > 0 ? (
//                     <SwiperSlide key={index} className="d-flex justify-content-center align-items-center">
//                     <div className=" " >
//                         <div className="position-relative mb-1" >
//                         <img
//                             src={`https://img.youtube.com/vi/${movie.videos[0].key}/hqdefault.jpg`}
//                             alt={`Trailer of ${movie.title}`}
//                             className="img-fluid rounded-2"
//                         />
//                         <div className="play-button position-absolute top-50 start-50 translate-middle">
//                             <a
//                             href={`https://www.youtube.com/watch?v=${movie.videos[0].key}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             >
//                             <img src={playIcon} alt="Play" />
//                             </a>
//                         </div>
//                         </div>
//                         <div className="card-body mb-2">
//                         <h5 className="card-title mainColor mt-3">{movie.title}</h5>
//                         </div>
//                     </div>
//                     </SwiperSlide>
//                 ) : null
//                 )}
//             </Swiper>
//         </div>
//          </>
//   );
// }






























































// // Import necessary modules
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'react-multi-carousel/lib/styles.css';
// import SliderItem from '../SliderItem/SliderItem'; 
// import playIcon from '../../assets/image_play1.png'; 
// import SwitchTabs from '../SwitchTabs/SwitchTabs';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Scrollbar } from 'swiper/modules';

// const API_KEY = 'b22e299473a6bd3b4ae42b1953fbd4b6';
// const BASE_URL = 'https://api.themoviedb.org/3';

// export default function ItemContent({title, subtitle, mediatype}) {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [endpoint, setEndpoint] = useState('day'); 

//   // Fetch trending movies and their videos
//   useEffect(() => {
//     const fetchTrendingMovies = async (endpoint) => {
//       try {
//         // Fetch trending movies
//         const { data } = await axios.get(`${BASE_URL}/trending/${mediatype}/${endpoint}?api_key=${API_KEY}`);
//         const movies = data.results || [];
        
//         // Fetch videos for each movie
//         const moviesWithVideos = await Promise.all(
//           movies.map(async (movie) => {
//             const videoData = await axios.get(`${BASE_URL}/${mediatype}/${movie.id}/videos?api_key=${API_KEY}`);
//             return { ...movie, videos: videoData.data.results };
//           })
//         );

//         setTrendingMovies(moviesWithVideos);
//       } catch (error) {
//         console.error('Error fetching trending movies and videos:', error);
//       }
//     };

//     fetchTrendingMovies(endpoint);
//   }, [endpoint]);

//   const onTabChange = (tab) => {
//     setEndpoint(tab === 'Today' ? 'day' : 'week');
//   };

//   return (
//     <>
//     <div className='itemcontent'>
//       {/* Trending Movies Carousel */}
//       <div className="  row  mb-2 m-0">
//       <div className="  mb-2 mb-md-0 me-2 me-md-0  col-md-3">
//             <div className="w-25 brdr mb-3"></div>
//             <h2 className="h3 mainColor">Trending <br /> {title} <br /></h2>
//             <p className="pb-2 pr">Most watched {subtitle} by days</p>
//              <div className="switch-tabs-container">
//                 <SwitchTabs data={['Today', 'This Week']} onTabChange={onTabChange} />
//             </div>
//             <div className="w-100 brdr mt-3"></div>
//             </div>
   
//             <div className='col-md-9  ps-md-5 ps-ms-0  p-0'>
//               <div className="carousel-container px-2 ">    
//                 <Swiper
//                     modules={[Scrollbar, Pagination]}
//                     spaceBetween={0}
//                     slidesPerView={8}
//                     scrollbar={{ draggable: true }}
                
//                     breakpoints={{
//                       320: { slidesPerView:  2},
//                       500: { slidesPerView: 3 },
//                       768: { slidesPerView: 3 },
//                       1024: { slidesPerView: 4 },
//                       1200: { slidesPerView: 5 },
//                       1450: { slidesPerView: 6 },
//                       2000: { slidesPerView: 8 },
//                     }}>
//                     {trendingMovies.map((movie, index) => (
//                     <SwiperSlide key={index} >
//                     <SliderItem key={index} item={movie} />
//                     </SwiperSlide>
//                     ))}  
//                 </Swiper>
//             </div>
//             </div>
//         </div>

//       </div>

//       {/* Trending Videos Carousel with Scrollbar */}
//       <div className="mt-4">
//             <Swiper
//                 modules={[Scrollbar, Pagination]}
//                 spaceBetween={12}
//                 slidesPerView={8}
//                 scrollbar={{ draggable: true }}
//                 breakpoints={{
//                 320: { slidesPerView: 1 },
//                 480: { slidesPerView: 2 },
//                 768: { slidesPerView: 3 },
//                 1024: { slidesPerView: 4 },
//                 1200: { slidesPerView: 5 },
//                 }}>
//                 {trendingMovies.map((movie, index) =>
//                 movie.videos && movie.videos.length > 0 ? (
//                     <SwiperSlide key={index} className="d-flex justify-content-center align-items-center">
//                     <div className=" " >
//                         <div className="position-relative mb-1" >
//                         <img
//                             src={`https://img.youtube.com/vi/${movie.videos[0].key}/hqdefault.jpg`}
//                             alt={`Trailer of ${movie.title}`}
//                             className="img-fluid rounded-2"
//                         />
//                         <div className="play-button position-absolute top-50 start-50 translate-middle">
//                             <a
//                             href={`https://www.youtube.com/watch?v=${movie.videos[0].key}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             >
//                             <img src={playIcon} alt="Play" />
//                             </a>
//                         </div>
//                         </div>
//                         <div className="card-body mb-2">
//                         <h5 className="card-title mainColor mt-3">{movie.title}</h5>
//                         </div>
//                     </div>
//                     </SwiperSlide>
//                 ) : null
//                 )}
//             </Swiper>
//         </div>
//          </>
//   );
// }
