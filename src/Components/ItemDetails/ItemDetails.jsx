import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ItemDetails() {
  let { id, media_type } = useParams();
  const [itemDetails, setItemDetails] = useState({});

  async function getDetailsFilm(id, media_type) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
    setItemDetails(data);
  }

  useEffect(() => {
    getDetailsFilm(id, media_type);
  }, [id, media_type]);

  return (
    <>
    <Helmet>
    <meta charSet='utf-8'/>
    <title>{itemDetails.title || itemDetails.name}</title>
  </Helmet>
      <div className="row py-5">
        <div className="col-md-3">
          {itemDetails.poster_path ? (
            <img className="w-100 " src={"https://image.tmdb.org/t/p/w500/" + itemDetails.poster_path} alt="" />
          ) : (
            <img className="w-100 " src={"https://image.tmdb.org/t/p/w500/" + itemDetails.profile_path} alt="" />
          )}
        </div>
        <div className="d-flex align-items-center offset-md-1 col-md-8">
        <div>
          <h3 className=" my-2">{itemDetails.title || itemDetails.name}</h3>
          <p className="py-2 pr">{itemDetails.tagline}</p>
          <div className="type d-flex">
            {itemDetails.genres?.map((g, index) => (
              <p key={index} className="text-light genre p-1 rounded-1 mx-2">
                {g.name}
              </p>
            ))}
          </div>

          <p className="py-1 text-style text-light">Vote : {itemDetails.vote_average?.toFixed(1)}</p>
          <p className="py-1 text-style text-light">Vote count : {itemDetails.vote_count}</p>
          <p className="py-1 text-style text-light">Popularity : {itemDetails.popularity}</p>
          <p className="py-1 text-style text-light">Release date : {itemDetails.release_date}</p>
          <p className="py-1 pr">Overview: {itemDetails.overview}</p>
          </div>
        </div>
      </div>
    </>
  );
}
