import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
      <div className="h-16"></div>
      <div style={{height: "50vh"}} className="w-full bg-black text-white flex flex-col items-center justify-start pt-4">
        <h1 className="text-4xl font-custom">View All Recipes</h1>
        {/* Your carousel goes here */}
      </div>
    </div>
  );
};

export default HomePage;