import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import PromotionSection from '../components/PromotionSection';
import Footer from '../components/Footer';

export default function MetierDetailsPage() {
  const { nomMetier } = useParams();
  const navigate = useNavigate();

  const [metier, setMetier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [autresMetiers, setAutresMetiers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/metiers/${nomMetier}`)
      .then((res) => res.json())
      .then((data) => {
        setMetier(data);
        setLoading(false);

       
        fetch(`http://localhost:8080/api/v1/categories/${data.nomCategorie}`)
          .then(res => res.json())
          .then(cat => {
            const autres = cat.metierResponses.filter(m => m.nom !== data.nom);
            setAutresMetiers(autres);
          });
      })
      .catch((err) => {
        console.error('Erreur chargement métier :', err);
        setLoading(false);
      });
  }, [nomMetier]);

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (!metier) return <p className="text-center py-10">Métier non trouvé.</p>;

  return (
    <div className="bg-white min-h-screen">
      <HeaderPage />

      {/* Image + nom du métier */}
      <div className="w-11/12 md:w-4/5 mx-auto m h-72 md:h-96 relative rounded overflow-hidden mt-5  ">

        <img src={metier.urlImage} alt={metier.nom} className="w-full h-full object-cover rounded-b-lg" />
        <h1 className="absolute bottom-4 left-6 text-white text-4xl md:text-5xl font-bold drop-shadow-xl">
          {metier.nom}
        </h1>
      </div>

      {/* Section professionnels */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Professionnel Populaire</h2>
              <p className="text-sm text-gray-500">Les professionnels ayant eu le plus d'activité ce mois</p>
            </div>
          </div>

          <div className="grid grid-cols-2  bg-grey sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex items-center justify-cente">
            {metier.profesionnelResponses?.length > 0 ? (
              metier.profesionnelResponses.map((pro, index) => (
<div  key={pro.email}  className="bg-blue-50 rounded-lg shadow-md overflow-hidden text-center">
  <img
    src={pro.urlProfile || 'https://via.placeholder.com/150'}
    alt={`${pro.prenom} ${pro.nom}`}
    className="w-full h-40 object-cover"
  />

  <div className="p-4">
    <h3 className="font-bold text-lg text-gray-800">{pro.prenom} {pro.nom}</h3>
    <p className="text-gray-600 text-sm mb-3">Domicile : {pro.adresse}</p>
    <button 
    onClick={() => navigate(`/profil-pro/${encodeURIComponent(pro.email)}`)}

    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      Voir pro
    </button>
  </div>
</div>

              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">Aucun professionnel pour ce métier pour le moment.</p>
            )}
          </div>
        </div>
      </section>

      {/* Section autres métiers */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Autres métiers</h2>
            <a href="/categories" className="text-sm text-blue-500 hover:underline">voir tout</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {autresMetiers.length > 0 ? (
              autresMetiers.map((m, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/metiers/${encodeURIComponent(m.nom)}`)}
                >
                  <img src={m.urlImage} alt={m.nom} className="w-full h-40 object-cover rounded-t" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{m.nom}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">{m.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aucun autre métier dans cette catégorie.</p>
            )}
          </div>
        </div>
      </section>
        <PromotionSection />
      <Footer />
    </div>
  );
}
