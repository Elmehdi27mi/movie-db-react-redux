import React, { useState, useEffect } from 'react';

// Import local images from the `src/assets/` directory
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';
import image6 from '../../assets/image6.jpg';
import { useNavigate } from 'react-router-dom';
 function Header() {
  
  const [query, setQuery] = useState("");
  const navigate =useNavigate();
  // Array of images and titles
  const images = [
    { src: image1, title: 'Image 1 Title' },
    { src: image2, title: 'Image 2 Title' },
    { src: image3, title: 'Image 3 Title' },
    { src: image4, title: 'Image 4 Title' },
    { src: image5, title: 'Image 5 Title' },
    { src: image6, title: 'Image 6 Title' },
    // Add more images as needed
  ];


  const searchQueryHandler = (e) => {
    e.preventDefault();
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    // Select a random image from the array
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []); // Only run on initial render

  if (!randomImage) return null; // In case of loading

  return <>

<div className="image-container-home mx-xxl-4 mx-0" style={{ backgroundImage: `url(${randomImage.src})` }}>
                      
        <div className="py-5 px-4">
          <h1 className="text-light fw-bolder  mt-3">Welcome.</h1>
          <h2 className="text-light fw-bolder">Millions of movies, TV shows and people to discover. Explore now.</h2>
          <div className="searchInput mt-5 mx-auto mb-3 mb-sm-2  ">
            <form onSubmit={searchQueryHandler} className='w-100 mb-2'>
            <input
              type="text"
              placeholder="Search for a movie or tv show...."
              onChange={(e) =>{
                setQuery(e.target.value)
              }
              }
            />
            <button >Search</button>
            </form>
          </div>
        </div>
        
                    </div>
             

      </>;
}

export default Header;


// // Import necessary modules
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import SliderItem from '../SliderItem/SliderItem'; // Assurez-vous que ce composant est défini correctement
// import playIcon from '../../assets/image_play1.png'; // Icône de lecture personnalisée
// import SwitchTabs from '../SwitchTabs/SwitchTabs';


// // Import local images from the `src/assets/` directory
// import image1 from '../../assets/image1.jpg';
// import image2 from '../../assets/image2.jpg';
// import image3 from '../../assets/image3.jpg';
// import image4 from '../../assets/image4.jpg';
// import image5 from '../../assets/image5.jpg';
// import image6 from '../../assets/image6.jpg';
// import image7 from '../../assets/image7.jpg';
// import image111 from '../../assets/image111.jpg';


// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Scrollbar } from 'swiper/modules';

// const API_KEY = 'b22e299473a6bd3b4ae42b1953fbd4b6';
// const BASE_URL = 'https://api.themoviedb.org/3';

// export default function Header() {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [randomImage, setRandomImage] = useState(null);
//   const [endpoint, setEndpoint] = useState('day'); 

//   // Fetch trending movies and their videos
//   useEffect(() => {
//     const fetchTrendingMovies = async (endpoint) => {
//       try {
//         // Fetch trending movies
//         const { data } = await axios.get(`${BASE_URL}/trending/tv/${endpoint}?api_key=${API_KEY}`);
//         const movies = data.results || [];
        
//         // Fetch videos for each movie
//         const moviesWithVideos = await Promise.all(
//           movies.map(async (movie) => {
//             const videoData = await axios.get(`${BASE_URL}/tv/${movie.id}/videos?api_key=${API_KEY}`);
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

//   // Set a random image for the header
//   useEffect(() => {
//     const images = [image1, image2, image3, image4, image5, image6,image7];
//     const randomIndex = Math.floor(Math.random() * images.length);
//     setRandomImage(images[randomIndex]);
//   }, []);


//   const onTabChange = (tab) => {
//     setEndpoint(tab === 'Today' ? 'day' : 'week');
//   };


//   if (!randomImage) return null; // Wait for the image to load

//   return (
//     <>
//     <div className='container'>
//       <div className="position-relative">
//         <img
//           src={randomImage}
//           className="img-fluid w-100"
//           alt="Random Header"
//           style={{ maxHeight: '500px', objectFit: 'cover' }}
//         />
//         <div className="position-absolute top-50 start-0 translate-middle-y ms-5">
//           <h1 className="text-light fw-bolder ">Welcome.</h1>
//           <h2 className="text-light fw-bolder ">
//             Millions of movies, TV shows and people to discover. Explore now.
//           </h2>
//         </div>
//       </div>

//       {/* Trending Movies Carousel */}
//       <div className=" pt-5" >
//       {/* <div className=" pt-5 d-md-flex justify-content-between  mb-2 ">
//   <div className="  mb-2 mb-md-0 me-2 ">
//     <div className="w-25 brdr  mb-3"></div>
//     <h2 className="h3  mainColor">Trending <br /> Movies <br /></h2>
//     <p className="pb-2  pr">Most watched movies by days</p>
//     <div className="switch-tabs-container">
//       <SwitchTabs data={['Today', 'This Week']} onTabChange={onTabChange} />
//     </div>
//     <div className="w-100 brdr mt-3"></div>
//   </div>
//   <div className="position-relative w-75 image-container-home" style={{ backgroundImage: `url(${image111})` }}>
//     <div className='ms-5 mb-5 mt-3'>
//     <h3>Joinder our github </h3>
//     <p>Loreabore natus provident omnis accusantium asperiores explicabo nulla nihil quam, qui consequatur! Impedit suscipit consequuntur atque et ipsum architecto fugit,  illo.
//     Saepe vero rep.</p>
//     <button className='btn btn-secondary px-5 py-2'>Github</button>
//     </div>

//   </div>
// </div> */}

// <div className="  row  mb-2 m-0">
//   <div className="  mb-2 mb-md-0 me-2 me-md-0  col-md-3">
//     <div className="w-25 brdr  mb-3"></div>
//     <h2 className="h3  mainColor">Trending <br /> Movies <br /></h2>
//     <p className="pb-2  pr">Most watched movies by days</p>
//     <div className="switch-tabs-container ">
//       <SwitchTabs data={['Today', 'This Week']} onTabChange={onTabChange} />
//     </div>
//     <div className="brdr mt-3 "></div>
//   </div>
   
// <div className='col-md-9  ps-md-5 ps-ms-0  p-0'>
//   <div className="carousel-container px-2 ">
//   <Swiper
//         modules={[Scrollbar, Pagination]}
//         spaceBetween={0}
//         slidesPerView={8}
//         scrollbar={{ draggable: true }}
      
//         breakpoints={{
//           320: { slidesPerView:  2},
//           500: { slidesPerView: 3 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//           1200: { slidesPerView: 5 },
//           1450: { slidesPerView: 6 },
//           2000: { slidesPerView: 8 },
//           }}>
         
//             {trendingMovies.map((movie, index) => (
//                <SwiperSlide key={index} >
//               <SliderItem key={index} item={movie} />
//               </SwiperSlide>
//             ))}
            
//            </Swiper>
//         </div>
//         </div>
 
// </div>

//       </div>

//       {/* Trending Videos Carousel with Scrollbar */}
//       <div className="mt-4">
//       <Swiper
//         modules={[Scrollbar, Pagination]}
//         spaceBetween={12}
//         slidesPerView={8}
//         scrollbar={{ draggable: true }}
      
//         breakpoints={{
//           320: { slidesPerView: 1 },
//           480: { slidesPerView: 2 },
//           768: { slidesPerView: 3 },
//           1024: { slidesPerView: 4 },
//           1200: { slidesPerView: 5 },
//         }}
//       >
//         {trendingMovies.map((movie, index) =>
//           movie.videos && movie.videos.length > 0 ? (
//             <SwiperSlide key={index} className="d-flex justify-content-center align-items-center">
//               <div className=" " >
//                 <div className="position-relative mb-1" >
//                   <img
//                     src={`https://img.youtube.com/vi/${movie.videos[0].key}/hqdefault.jpg`}
//                     alt={`Trailer of ${movie.title}`}
//                     className="img-fluid rounded-2"
//                   />
//                   <div className="play-button position-absolute top-50 start-50 translate-middle">
//                     <a
//                       href={`https://www.youtube.com/watch?v=${movie.videos[0].key}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <img src={playIcon} alt="Play" />
//                     </a>
//                   </div>
//                 </div>
//                 <div className="card-body mb-2">
//                   <h5 className="card-title mainColor mt-3">{movie.title}</h5>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ) : null
//         )}
//       </Swiper>
//       </div>
//       </div>
//          </>
//   );
// }
