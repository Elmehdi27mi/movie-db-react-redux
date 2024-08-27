import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SliderItem from '../SliderItem/SliderItem';  // Adjust the path if necessary
import { useDispatch, useSelector } from 'react-redux';
import { getPeopleDetails, getCombinedCredits } from '../../Redux/moviesslice';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Swiper modules
import { Scrollbar, Pagination } from 'swiper/modules';
import TextWithViewMore from '../TextWithViewMore/TextWithViewMore';

export default function PeopleDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const peopleDetails = useSelector((state) => state.media.peopleDetails);
    const combinedCredits = useSelector((state) => state.media.combinedCredits);
    const loading = useSelector((state) => state.media.loading);

    useEffect(() => {
        dispatch(getPeopleDetails({ id }));
        dispatch(getCombinedCredits({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        console.log("People Details:", peopleDetails);
        console.log("Combined Credits:", combinedCredits);
    }, [peopleDetails, combinedCredits]);

    return (
        <div className="container py-5 mt-5">
            <div className="row">
                <div className=" col-xxl-3 col-xl-4 col-lg-5 col-sm-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${peopleDetails.profile_path}`}
                        alt={peopleDetails.name}
                        className="img-fluid rounded me-2"
                         
                    />
                </div>
                <div className="col-xxl-7 col-xl-7 col-lg-6 col-sm-6 ">
                    <h1 className='fw-bolder mb-4 font-secondary mt-sm-0 mt-3'>{peopleDetails.name}</h1>
                    <h4 className='fw-bold font-secondary'>Biography</h4>
                    <div className='mb-4'>
                    <TextWithViewMore text={peopleDetails.biography} maxLength={290} />
                    </div>
                    <div className="carousel-wrapper">
                        <h4 className='fw-bolder font-secondary'>Known For</h4>
                        <Swiper
                            modules={[Scrollbar, Pagination]}
                            spaceBetween={14}
                            slidesPerView={5}
                            scrollbar={{ draggable: true }}
                            breakpoints={{
                                320: { slidesPerView: 3 },
                                570: { slidesPerView: 2 },
                                786: { slidesPerView: 3 },

                                1200: { slidesPerView: 4 },
                                1400: { slidesPerView: 6 },
                                2000: { slidesPerView: 7 },
                            }}
                        >
                            {combinedCredits && combinedCredits.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <SliderItem item={item} loading={loading} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
}
