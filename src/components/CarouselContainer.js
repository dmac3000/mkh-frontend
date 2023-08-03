import React from 'react';
import CustomCarousel from './CustomCarousel';

const CarouselContainer = ({ title, text, items, subtitle }) => (
    <div className="mx-auto my-auto text-white w-1/2 pt-10">
      <div className="bg-black/70 px-6 rounded-2xl relative pb-20">
        <div className="h-24">
          <h1 className="text-4xl text-white mb-2 pt-4">{title}</h1>
          <p className="text-white pl-2">{text}</p>
          {subtitle && <p className="text-white pl-2 mb-8">{subtitle}</p>}
        </div>
        <CustomCarousel items={items} />
      </div>
    </div>
  );
  

export default CarouselContainer;