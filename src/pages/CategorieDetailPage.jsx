import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import PromotionSection from '../components/PromotionSection';
import Footer from '../components/Footer';

export default function CategorieDetailPage() {
  const { nomCategorie } = useParams();
  const navigate = useNavigate();

  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/categories/${nomCategorie}`)
      .then(res => res.json())
      .then(data => {
        setCategorie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur chargement catégorie :', err);
        setLoading(false);
      });
  }, [nomCategorie]);

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (!categorie) return <p className="text-center py-10">Catégorie non trouvée.</p>;

  return (
    <div className="bg-white min-h-screen">
      <HeaderPage />

      {/* Section titre & description */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{categorie.nom}</h1>
          <p className="text-gray-700 leading-relaxed">{categorie.description}</p>
        </div>
      </section>

      {/* Section métiers */}
      <section className="bg-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Métiers disponibles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categorie.metierResponses.map((metier) => (
              <div
                key={metier.nom}
                className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer overflow-hidden"
                onClick={() => navigate(`/metiers/${encodeURIComponent(metier.nom)}`)}
              >
                <img
                  src={metier.urlImage}
                  alt={metier.nom}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{metier.nom}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{metier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PromotionSection />
      <Footer />
    </div>
  );
}
