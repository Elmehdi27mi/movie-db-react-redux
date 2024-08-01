// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SliderItem from '../SliderItem/SliderItem'; // Assurez-vous que ce composant est défini correctement
import playIcon from '../../assets/image_play1.png'; // Icône de lecture personnalisée

// Import local images from the `src/assets/` directory
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';
import image6 from '../../assets/image6.jpg';

const API_KEY = 'b22e299473a6bd3b4ae42b1953fbd4b6';
const BASE_URL = 'https://api.themoviedb.org/3';

export default function Header() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  // Fetch trending movies and their videos
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        // Fetch trending movies
        const { data } = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const movies = data.results || [];
        
        // Fetch videos for each movie
        const moviesWithVideos = await Promise.all(
          movies.map(async (movie) => {
            const videoData = await axios.get(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
            return { ...movie, videos: videoData.data.results };
          })
        );

        setTrendingMovies(moviesWithVideos);
      } catch (error) {
        console.error('Error fetching trending movies and videos:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  // Set a random image for the header
  useEffect(() => {
    const images = [image1, image2, image3, image4, image5, image6];
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  // Responsive breakpoints for the carousels
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 6000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  if (!randomImage) return null; // Wait for the image to load

  return (
    <>
      <div className="position-relative pb-5">
        <img
          src={randomImage}
          className="img-fluid w-100"
          alt="Random Header"
          style={{ maxHeight: '500px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-50 start-0 translate-middle-y ms-5">
          <h1 className="text-light fw-bolder ">Welcome.</h1>
          <h2 className="text-light fw-bolder ">
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
      </div>

      {/* Trending Movies Carousel */}
      <div className="row">
        <div className="col-md-3 d-flex mb-2">
          <div>
            <div className="w-25 brdr mb-3"></div>
            <h2 className="h3 mainColor">Trending <br /> Movies <br /> to watch now</h2>
            <p className="py-2 pr">Most watched movies by days</p>
            <div className="w-100 brdr mt-3"></div>
          </div>
        </div>
        <div className="carousel-container my-own-custom-container col-md-9">
          <Carousel responsive={responsive} partialVisible={true} arrows={false}>
            {trendingMovies.map((movie, index) => (
              <SliderItem key={index} item={movie} />
            ))}
          </Carousel>
        </div>
      </div>

      {/* Trending Videos Carousel with Scrollbar */}
      <div className="mt-3">
        <div className="scroll-container my-own-custom-container">
          {trendingMovies.map((movie, index) =>
            movie.videos && movie.videos.length > 0 ? (
              <div key={index} className="video-item px-2 d-inline-block" style={{ minWidth: '200px' }}>
                <div className="position-relative mb-2" style={{ marginBottom: '20px' }}>
                  <img
                    src={`https://img.youtube.com/vi/${movie.videos[0].key}/hqdefault.jpg`}
                    alt={`Trailer of ${movie.title}`}
                    className="img-fluid rounded-2"
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                  />
                  <div className="play-button position-absolute top-50 start-50 translate-middle ">
                    <a
                      href={`https://www.youtube.com/watch?v=${movie.videos[0].key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={playIcon} alt="Play" style={{ width: '50px', height: '50px' }} />
                    </a>
                  </div>
                </div>
                <div className="card-body mb-2">
                  <h5 className="card-title mainColor mt-3">{movie.title}</h5>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
      <div class="flex-wrapper">
  <div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart orange">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="30, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">30%</text>
    </svg>
  </div>
  
  <div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart green">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="60, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">60%</text>
    </svg>
  </div>

  <div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart blue">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="90, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">90%</text>
    </svg>
  </div>
</div>
    </>
  );
}
