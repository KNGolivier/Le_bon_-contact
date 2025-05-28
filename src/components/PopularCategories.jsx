import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PopularCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories') 
      .then((res) => res.json())
      .then((data) => {
         console.log(' Données reçues depuis l’API :', data);
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des catégories :', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Titre */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-black">Catégories Populaires</h2>
          <p className="text-gray-500">Les catégories ayant eu le plus d'activité ce mois</p>
        </div>

        {/* Grille */}
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
             <div
    key={index}
    onClick={() => navigate(`/categories/${encodeURIComponent(cat.nom)}`)}
    className="bg-blue-100 p-4 rounded-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-200 transition"
  >
                <div className="w-12 h-12 mb-2 bg-white rounded-full flex items-center justify-center border border-blue-400">
                  <img
                    src={cat.urlIcone}
                    alt={cat.nom}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-800">{cat.nom}</p>
              </div>
            ))}
          </div>
        )}

        {/* Lien vers toutes les catégories */}
        <div className="flex items-center mt-4">
          <button
        onClick={() => navigate(`/categories/${encodeURIComponent(cat.nom)}`)}
            className="text-blue-500 hover:underline font-medium"
          >
            voir tout
          </button>
        </div>
      </div>
    </section>
  );
}
