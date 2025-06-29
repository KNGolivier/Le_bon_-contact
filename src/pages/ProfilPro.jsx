import React, { useEffect, useState } from 'react';

import { useParams , useNavigate  } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import PromotionSection from '../components/PromotionSection';
import Footer from '../components/Footer';

// Fonction utilitaire pour afficher "il y a X minutes/heures/jours"
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // en secondes

  if (diff < 60) return 'il y a quelques secondes';
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `il y a ${Math.floor(diff / 3600)} h`;
  return `il y a ${Math.floor(diff / 86400)} j`;
}

export default function ProfilPro() {
  const { email } = useParams();
  const decodedEmail = decodeURIComponent(email);
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realisations, setRealisations] = useState([]);
    const navigate = useNavigate();


  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        let found = null;

        for (const categorie of data) {
          for (const metier of categorie.metierResponses || []) {
            for (const professionnel of metier.profesionnelResponses || []) {
              if (professionnel.email === decodedEmail) {
                found = { ...professionnel, nomCategorie: categorie.nom };
                setRealisations(professionnel.realisationResponses || []);
                break;
              }
            }
            if (found) break;
          }
          if (found) break;
        }

        setPro(found);
      })
      .catch(err => {
        console.error('Erreur chargement professionnel :', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [decodedEmail]);

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (!pro) return <p className="text-center py-10">Professionnel non trouvé.</p>;

  return (
    <div className="min-h-screen bg-white">
      <HeaderPage />

      {/* Bandeau haut */}
      <div
        className="relative w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')" }}
      >
        <div className="absolute bottom-0 left-0 ml-8 mb-4 flex items-center">
          <img
            src={pro.urlProfile}
            alt={`${pro.prenom} ${pro.nom}`}
            className="w-28 h-28 rounded-full border-4 border-white object-cover"
          />
          <div className="ml-4 text-white">
            <h2 className="text-2xl font-bold">{pro.prenom} {pro.nom}</h2>
            <p className="text-sm">{pro.nomMetier}</p>
          </div>
        </div>
      </div>

      {/* Infos principales */}
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="bg-gray-100 rounded-lg shadow p-6 space-y-4">
          <p className=""><strong>INFORMATION du Professionnel</strong></p>
          <p><strong>Email :</strong> {pro.email}</p>
          <p><strong>Téléphone :</strong> {pro.numero}</p>
          <p><strong>Adresse :</strong> {pro.adresse}</p>
          <p><strong>Métier :</strong> {pro.nomMetier}</p>
          <p><strong>Catégorie :</strong> {pro.nomCategorie}</p>
          <p><strong>Note :</strong> {pro.note}</p>
        </div>
      </div>

      {/* Réalisations */}
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Réalisations</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {realisations.length > 0 ? (
            realisations.map((real, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex items-center p-4">
                  <img
                    src={pro.urlProfile}
                    alt={`${pro.prenom} ${pro.nom}`}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-semibold">{pro.prenom} {pro.nom}</h4>
                    <p className="text-xs text-gray-500">{timeAgo(real.dateCreation)}</p>
                  </div>
                </div>
                <img
                  src={real.urlImage}
                  alt={real.titre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">{real.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucune réalisation disponible.</p>
          )}
        </div>
      </div>
 

      <PromotionSection />
      <Footer />
    </div>
  );
}
