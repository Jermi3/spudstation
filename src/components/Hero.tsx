import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-spud-cream to-spud-light py-20 px-4">
      {/* Checkerboard pattern overlay */}
      <div className="absolute inset-0 bg-checkerboard bg-checkerboard-small opacity-5"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Logo-style heading */}
        <div className="relative inline-block mb-8 animate-fade-in">
          <div className="bg-spud-brown rounded-2xl p-6 shadow-2xl border-4 border-spud-orange">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <span className="text-4xl">🥔</span>
              <h1 className="text-4xl md:text-5xl font-pretendard font-black text-spud-white uppercase tracking-wide">
                SPUD STATION
              </h1>
            </div>
            <p className="text-spud-orange font-semibold text-lg uppercase tracking-wider">
              BAKED POTATOES & SNACKS
            </p>
            <p className="text-spud-white text-sm font-medium mt-2">
              EST. 2025
            </p>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-pretendard font-bold text-spud-brown mb-6 animate-slide-up">
          OVERLOAD BAKED POTATO
        </h2>
        <p className="text-xl text-spud-dark mb-8 max-w-2xl mx-auto animate-slide-up leading-relaxed">
          Handcrafted baked potatoes loaded with premium ingredients. 
          From classic cheese & butter to our signature chili con carne.
        </p>
        
        <div className="flex justify-center space-x-4 animate-slide-up">
          <a 
            href="#menu"
            className="bg-spud-orange text-spud-white px-8 py-4 rounded-xl hover:bg-spud-hover transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Explore Menu
          </a>
          <a 
            href="#fries"
            className="bg-spud-brown text-spud-white px-8 py-4 rounded-xl hover:bg-spud-dark transition-all duration-300 transform hover:scale-105 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Try Our Fries
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;