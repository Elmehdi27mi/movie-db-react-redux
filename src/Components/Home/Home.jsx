import React, { useEffect } from 'react';
import MediaItem from '../MediaItem/MediaItem';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getTrending } from '../../Redux/moviesslice';

export default function Home() {
    const dispatch = useDispatch();
    const { trendingMovies, trendingTv, trendingPeople } = useSelector((state) => state.media);

    useEffect(() => {
        dispatch(getTrending('movie'));
        dispatch(getTrending('tv'));
        dispatch(getTrending('person'));
    }, []);

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Home Page</title>
            </Helmet>
            <div className="row py-5">
                <div className='col-md-4 d-flex'>
                    <div>
                        <div className="w-25 brdr mb-3"></div>
                        <h2 className='h3'>Trending <br /> Movies <br /> to watch now</h2>
                        <p className='py-2 pr'>Most watched movies by days</p>
                        <div className="w-100 brdr mt-3"></div>
                    </div>
                </div>
                {trendingMovies && trendingMovies.slice(0, 10).map((movie, index) => <MediaItem key={index} item={movie} />)}
            </div>

            <div className="row py-5">
                <div className='col-md-4 d-flex'>
                    <div>
                        <div className="w-25 brdr mb-3"></div>
                        <h2 className='h3'>Trending <br /> TV <br /> to watch now</h2>
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
                        <h2 className='h3'>Famous <br /> People <br /> to watch now</h2>
                        <p className='py-2 pr'>Most famous people by days</p>
                        <div className="w-100 brdr mt-3"></div>
                    </div>
                </div>
                {trendingPeople && trendingPeople.filter((person) => person.profile_path !== null).slice(0, 10).map((person, index) => <MediaItem key={index} item={person} />)}
            </div>
        </>
    );
}
