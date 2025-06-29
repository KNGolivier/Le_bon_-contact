// src/components/BecomeProBanner.jsx
import React from 'react';
import MenImg from '../assets/Men.png'; // remplace par ton image exacte

export default function BecomeProBanner() {
  return (
    <section className="bg-gray-50 px-6 py-2">
      <div className="flex justify-between items-center bg-[#009fe3] rounded-[20px] my-[80px] mx-auto p-[40px] max-w-[1200px] w-[90%] overflow-hidden flex-wrap">
        {/* Texte à gauche */}
        <div className="text-white md:w-2/3 space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold leading-snug">
            Commencez votre voyage professionnel en mettant votre métier au service des autres.
          </h2>
          <p className="text-white text-sm opacity-90">
            Si on veut obtenir quelque chose que l’on n’a jamais eu, il faut tenter quelque chose que l’on n’a jamais fait.
          </p>
          <button className="w-[30%] bg-[#f3f3f3] text-[#009fe3] font-bold text-[14px] font-[Montserrat] px-[10px] py-[12px] rounded-[10px] border-none cursor-pointer transition-all duration-300 ease-in-out mt-[15px] hover:bg-[#009fe3] hover:text-[#f3f3f3] hover:border-[1px] hover:border-white">
            commencer maintenant
          </button>
        </div>

        {/* Image à droite */}
        <div className="relative left-[50px] top-[50px] w-full max-w-[234px] h-auto object-cover">
          <img src={MenImg } alt="Devenir Pro" className="w-50 md:w-56 object-contain" />
        </div>
      </div>
    </section>  
  );
}
