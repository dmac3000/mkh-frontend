import React from 'react';
import CustomCarousel from './CustomCarousel';

const CarouselContainer = ({ title, text, items, subtitle }) => (
<div className="mx-auto my-auto text-white sm:w-full md:w-3/4 lg:w-1/2 pt-10">
  <div className="bg-black/70 px-6 rounded-2xl relative pb-20 sm:pb-32 md:pb-12">
    <div className="flex flex-col md:flex-row items-start">
      <div className="w-full md:w-1/2 h-auto md:h-24"> {/* Replace [value] with the desired amount */}
        <h1 className="text-4xl text-white mb-2 pt-4">{title}</h1>
        <p className="text-white pl-2">{text}</p>
        {subtitle && <p className="text-white pl-2 mb-8">{subtitle}</p>}
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-12">
        <CustomCarousel items={items} />
      </div>
    </div>
  </div>
</div>


  );
  
export default CarouselContainer;