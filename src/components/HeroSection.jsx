import React from 'react';
import WomanImg from '../assets/Woman.png';
import SearchBar from '../components/SearchBar'; 

export default function HeroSection() {
  return (
    <section className="w-full bg-[#00AEEF]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-10">
        {/* Texte */}
        <div className="text-white md:w-3/7 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Trouver des professionnels de confiance pour tous vos besoins
          </h1>
          <SearchBar />
        </div>

        {/* Image */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-end">
          <img
            src={WomanImg}
            alt="Professionnelle"
            className="w-70 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
