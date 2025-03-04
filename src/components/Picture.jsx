import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { picture} from '../assets';
import { Link } from 'react-router-dom'; 
import SectionWrapper from './SectionWrapper';
// Add your own images by putting them in the assets folder and import them.
const images = [
 picture,
 picture,
 picture,
 picture,

];
function Picture() {
  const [loadedImages, setLoadedImages] = useState(0);
  const [swipedImages, setSwipedImages] = useState(0);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  const handleDragEnd = (_, info) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      setSwipedImages((prev) => prev + 1);
    }
  };

  const allImagesLoaded = loadedImages === images.length;
  const allImagesSwiped = swipedImages === images.length;

  return (
    <SectionWrapper>
      <Link to="/card">
        <p className={`absolute text-4xl font-bold text-customBlue transform rotate-6 cursor-pointer 
          ${allImagesSwiped ? 
            'bg-white bg-opacity-90 rounded-lg px-6 py-5 w-full h-fit left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' : 
            'inset-0 flex justify-center items-center text-center'
          }`}>
          Po plakesh Xio
        </p>
      </Link>
      {!allImagesLoaded && (
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-xl font-medium text-gray-500">Loading images...</p>
        </div>
      )}
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            allImagesLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            zIndex: images.length - index,
          }}
          initial={{
            scale: 1,
            rotate: Math.random() * 20 - 10,
          }}
          whileDrag={{
            scale: 1.05,
            rotate: Math.random() * 20 - 10,
          }}
          drag
          onDragEnd={handleDragEnd}
        >
          <img
            src={image}
            alt={`Stacked image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onLoad={handleImageLoad} // Increment the counter when the image loads
          />
        </motion.div>
      ))}
    </SectionWrapper>
  );
}

export default Picture;
