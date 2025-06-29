// src/components/CategorieCard.jsx
import React from 'react';

export default function CategorieCard({ nom, imageUrl }) {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <img
        src={imageUrl}
        alt={nom}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-3 left-4 text-white text-lg font-semibold drop-shadow">
        {nom}
      </div>
    </div>
  );
}
