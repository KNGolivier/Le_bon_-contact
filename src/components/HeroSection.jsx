
import React from 'react';
import WomanImg from '../assets/Woman.png'; // image de la femme

export default function HeroSection() {
  return (
    <section className="w-full bg-[#00AEEF] h-[590px]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">
        {/* Texte */}
        <div className="text-white md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Trouver des professionnels de confiance pour tous vos besoins
          </h1>
          <div className="bg-white rounded-full px-4 py-2 flex items-center w-full max-w-md">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M13.293 14.707a8 8 0 111.414-1.414l4.386 4.387a1 1 0 01-1.414 1.414l-4.386-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Rechercher votre profession"
              className="flex-1 outline-none text-gray-700 bg-transparent"
            />
          </div>
        </div>

        {/* Image */}
        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-end">
          <img
            src={WomanImg}
            alt="Professionnelle"
            className="w-72 md:w-96 rounded-bl-[100px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
