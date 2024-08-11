import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getTrending } from '../../Redux/moviesslice';
import Header from '../Header/Header'
import ItemContent from '../ItemContent/ItemContent';
import image111 from '../../assets/image111.jpg';
import image114 from '../../assets/image114.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';
import PersonSlider from '../PersonSlider/PersonSlider';

export default function Home() {
    const dispatch = useDispatch();
    const { trendingPeople } = useSelector((state) => state.media);
    useEffect(() => {
        dispatch(getTrending('person'));
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Home Page</title>
            </Helmet>
            <div className="container">
                <Header/>

                <div className="mt-5">
                <ItemContent  title="Movie" subtitle="movies" mediatype="movie"/>
                </div>
          
                <div className=" my-5 ">
                    <div className="position-relative w-100 image-container-home" style={{ backgroundImage: `url(${image111})` }}>
                        <div className='m-5'>
                        <h3>Joind our github </h3>
                        <p>Loreabore natus provident omnis accusantium asperiores explicabo nulla nihil quam, qui consequatur! Impedit suscipit consequuntur atque et ipsum architecto fugit,  illo.
                        Saepe vero rep.</p>
                        <button className='btn btn-secondary px-5 py-2 mt-4'>Github</button>
                        </div>
                    </div>
                </div> 

                <div className="mt-5 mb-3">
                <ItemContent  title="Tv" subtitle="tv" mediatype="tv"/>
                </div>

                <div className=" my-5 ">
                    <div className="position-relative w-100 image-container-home" style={{ backgroundImage: `url(${image114})` }}>
                        <div className='m-5'>
                        <h3>Join Today </h3>
                        <p>Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch next—regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, Disney Plus, Apple TV Plus, and Hulu.</p>
                        <button className='btn btn-secondary px-5 py-2 mt-4'>Github</button>
                        </div>
                    </div>
                </div> 
                <div className="  row   m-0">
                <div className="  mb-2 mb-md-0 me-2 me-md-0  col-md-2">
                <div className="w-25 brdr mb-3"></div>
                <h2 className='h3 mainColor'>Popular  <br /> People</h2>
                <p className='py-2 pr'>Most famous people</p>
                <div className="w-100 brdr mt-3"></div>
                </div>

                <div className='col-md-10  ps-md-5 ps-ms-0  p-0'>
              <div className=" px-2 ">    
                <Swiper
                    modules={[Scrollbar, Pagination]}
                    spaceBetween={10}
                    slidesPerView={8}
                    scrollbar={{ draggable: true }}
                
                    breakpoints={{
                    320: { slidesPerView: 2 },
                    500: { slidesPerView: 3 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1200: { slidesPerView: 5 },
                    1450: { slidesPerView: 6 },
                    2000: { slidesPerView: 7 },
                    }}>
                    {trendingPeople && trendingPeople.filter((person) => person.profile_path !== null).map((person, index) => (
                    <SwiperSlide key={index} >
                    <PersonSlider key={index} item={person} />
                    </SwiperSlide>
                    ))}  
                </Swiper>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}







































{/* <div className="row py-5">
                <div className='col-md-4 d-flex'>
                    <div>
                        <div className="w-25 brdr mb-3"></div>
                        <h2 className='h3 mainColor'>Trending <br /> Movies <br /> to watch now</h2>
                        <p className='py-2 pr'>Most watched movies by days</p>
                        <div className="w-100 brdr mt-3"></div>
                    </div>
                </div>
            </div>
            
            <div className="row py-5">
                <div className='col-md-4 d-flex'>
                    <div>
                        <div className="w-25 brdr mb-3"></div>
                        <h2 className='h3 mainColor'>Trending <br /> TV <br /> to watch now</h2>
                        <p className='py-2 pr'>Most watched TV shows by days</p>
                        <div className="w-100 brdr mt-3"></div>
                    </div>
                </div>
                {trendingTv && trendingTv.slice(0, 10).map((tv, index) => <MediaItem key={index} item={tv} />)}
            </div>

            <div className="row py-5">
                <div className='col-md-4 d-flex'>
                    <div>
                        <div className="w-25 brdr mb-3"></div>
                        <h2 className='h3 mainColor'>Famous <br /> People <br /> to watch now</h2>
                        <p className='py-2 pr'>Most famous people by days</p>
                        <div className="w-100 brdr mt-3"></div>
                    </div>
                </div>
                {trendingPeople && trendingPeople.filter((person) => person.profile_path !== null).slice(0, 10).map((person, index) => <MediaItem key={index} item={person} />)}
            </div> */}