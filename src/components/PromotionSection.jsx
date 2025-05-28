// src/components/PromotionSection.jsx
import React from 'react';
import Thumbnail from '../assets/Thumbnail.png'; 

export default function PromotionSection() {
  return (
    <section className="bg-white ">   
      <div className="max-w-7xl mx-auto">
        <img
          src={Thumbnail} 
          alt="Promotion application"
          className="w-full shadow-sm object-cover"
        />
      </div>
    </section>
  );
}
