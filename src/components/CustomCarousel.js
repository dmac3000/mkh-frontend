import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import RecipeCard from './RecipeCard'; // Make sure to import RecipeCard and your arrow images
import leftArrowImage from '../assets/carouselarrowleft.png';
import rightArrowImage from '../assets/carouselarrowright.png';

const CustomCarousel = ({ items }) => {
  return (
    <Carousel
      showStatus={false}
      showIndicators={false}
      className=''
      infiniteLoop={true}
      showThumbs={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
          >
            <img src={leftArrowImage} alt="Previous" />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 w-8 h-8"
          >
            <img src={rightArrowImage} alt="Next" />
          </button>
        )
      }
    >
      {items.map(item => (
        <div key={item._id}>
          <RecipeCard recipe={item} />
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;