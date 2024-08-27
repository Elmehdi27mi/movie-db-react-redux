import React from 'react';
import Skeleton from '@mui/material/Skeleton'; // Importer Skeleton de MUI
import playIcon from '../../assets/image_play.png';
import loadingImage from '../../assets/placeholder1.png'; // Importer l'image

export default function SliderItemVedeos({ item, loading }) {
  return (
    <div className="itemVedeo">
        {loading ? (
                <div className="position-relative mb-5">
              
                <img
                  src={loadingImage}
                  alt="Loading"
                  className="w-100 rounded-2 "
                />
                {/* Skeleton overlay pour l'effet wave */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  className="position-absolute top-0 start-0 rounded-2"
                  animation="wave"
                  style={{ backgroundColor: 'transparent' }} // Overlay transparent
                />
                {/* Skeleton pour le titre */}
                <Skeleton
                  variant="text"
                  width={120}
                  height={50}
                  className="mt-3"
                  animation="wave"
                />
              </div>
        ) : (
         
                <div className=" mb-1">
                <div className="position-relative ">

            <img
              src={`https://img.youtube.com/vi/${item.videos[0].key}/hqdefault.jpg`}
              alt={`Trailer of ${item.title}`}
              className="img-fluid rounded-2"
            />
            <div className="play-button position-absolute top-50 start-50 translate-middle">
              <a
                href={`https://www.youtube.com/watch?v=${item.videos[0].key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={playIcon} alt="Play" />
              </a>
            </div>
            </div>
            <p className="mt-3 mainColor fw-bolder font-secondary">{item.title || item.name}</p>

            </div>
        )}
    
    </div>
  );
}





























// import React from 'react';
// import Skeleton from '@mui/material/Skeleton'; // Importer Skeleton de MUI
// import playIcon from '../../assets/image_play1.png';
// import loadingImage from '../../assets/placeholder2.png'; // Importer l'image

// export default function SliderItemVedeos({ item, loading }) {
//   console.log(item);
//   console.log("-------------------------------------------------------");
//   return (
//     <div className="itemVedeo w-100">
//       <div className="position-relative mb-1 w-100">
//         {loading ? (
//                 <div className="position-relative">
//                 {/* Affichage de l'image de chargement */}
//                 <img
//                   src={loadingImage}
//                   alt="Loading"
//                   className=" img-fluid rounded-2 "
//                 />
//                 {/* Skeleton overlay pour l'effet wave */}
//                 <Skeleton
//                   variant="rectangular"
//                   width="100%"
//                   height="100%"
//                   className="position-absolute top-0 start-0 rounded-2"
//                   animation="wave"
//                   style={{ backgroundColor: 'transparent' }} // Overlay transparent
//                 />
//               </div>
//         ) : (
//           <>
//             <img
//               src={`https://img.youtube.com/vi/${item.videos[0].key}/hqdefault.jpg`}
//               alt={`Trailer of ${item.title}`}
//               className="img-fluid rounded-2"
//             />
//             <div className="play-button position-absolute top-50 start-50 translate-middle">
//               <a
//                 href={`https://www.youtube.com/watch?v=${item.videos[0].key}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <img src={playIcon} alt="Play" />
//               </a>
//             </div>
//           </>
//         )}
//       </div>
//       <div className="card-body mb-5">
//         {loading ? (
//           <Skeleton 
//             variant="text" 
//             width="60%" 
//             height={50} 
//             className="mt-3" 
//             animation="wave" 
//           />
//         ) : (
//           <h5 className="card-title mainColor mt-3">{item.title}{item.name}</h5>
//         )}
//       </div>
//     </div>
//   );
// }
