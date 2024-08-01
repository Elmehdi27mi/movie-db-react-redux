import axios from 'axios';
import React, { useState, useEffect } from 'react';

const API_KEY = 'b22e299473a6bd3b4ae42b1953fbd4b6'; // Remplacez par votre clé API TMDb
const BASE_URL = 'https://api.themoviedb.org/3';

const Movie = () => {
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        // Récupération des films tendances de la semaine
        const response = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const movies = response.data.results || [];
        console.log("****************************************************");
        console.log()

        // Pour chaque film, récupérer les vidéos (bandes-annonces, teasers, etc.)
        const trailersData = await Promise.all(movies.map(async (movie) => {
          const videoResponse = await axios.get(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
          return {
            ...movie,
            videos: videoResponse.data.results // Ajout des vidéos au film
          };
        }));

        setTrailers(trailersData);
      } catch (error) {
        console.error('Error fetching trailers:', error);
        setError('Failed to load trailers.');
      }
    };

    fetchTrailers();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest Trailers</h2>
      <div className="row">
        {trailers.length > 0 ? (
          trailers.map((trailer) => (
            <div className="col-md-4 mb-4" key={trailer.id}>
              <div className="card">
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500/${trailer.poster_path}`}
                  alt={trailer.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{trailer.title}</h5>
                  <p className="card-text">{trailer.overview}</p>
                  {trailer.videos.length > 0 ? (
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        className="embed-responsive-item"
                        src={`https://www.youtube.com/embed/${trailer.videos[0].key}`}
                        allowFullScreen
                        title={trailer.title}
                      ></iframe>
                    </div>
                  ) : (
                    <p>No trailers available</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading trailers...</p>
        )}
      </div>
    </div>
  );
};

export default Movie;
