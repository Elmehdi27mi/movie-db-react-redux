import React, { useState, useEffect } from 'react';

// Import local images from the `src/assets/` directory
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
import image4 from '../../assets/image4.jpg';
import image5 from '../../assets/image5.jpg';
import image6 from '../../assets/image6.jpg';

function People() {
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

  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    // Select a random image from the array
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []); // Only run on initial render

  if (!randomImage) return null; // In case of loading

  return (
   
      <div className="position-relative">
        <img
          src={randomImage.src}
          className="img-fluid w-100"
          alt={randomImage.title}
          style={{ maxHeight: '500px', objectFit: 'cover' }} // Ensures images fit within the container
        />
        <div className=" position-absolute top-50 start-0 translate-middle-y ms-5">
          <h1 className="text-light fw-bolder">Welcome.</h1>
          <h2 className="text-light fw-bolder">Millions of movies, TV shows and people to discover. Explore now.</h2>
        </div>
      </div>

  );
}

export default People;
