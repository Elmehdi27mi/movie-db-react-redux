import React, { useEffect, useState } from 'react';
import SwitchTabs from '../SwitchTabs/SwitchTabs';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SliderItem from '../SliderItem/SliderItem';

export default function Profile({ userData }) {
  const [mediaType, setMediaType] = useState('movie'); 
  const [treandingMovies, setTreandingMovies] = useState([]);

  const onTabChange = (tab) => {
    setMediaType(tab === 'Movies' ? 'movie' : 'tv');
  };
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 6000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  async function getFilms(mediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    setTreandingMovies(data.results)
  }
  useEffect(() => {
    getFilms(mediaType);
  }, [mediaType]);

  return <>
    <div className="carouselSection">
      <span className="carouselTitle mainColor">What's Popular</span>
      <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
    </div>

    <div className="carousel-container   pt-5 col-md-9">
    <Carousel responsive={responsive} partialVisible={true}  >
      {treandingMovies.map((movie, index) => (
        <SliderItem key={index} item={movie} />
      ))}
    </Carousel>
    </div>
</>
}
