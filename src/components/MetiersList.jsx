import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MetiersList() {
  const navigate = useNavigate();
  const [metiers, setMetiers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔧 Appel API simulé (remplace par ton URL plus tard)
  useEffect(() => {
    setTimeout(() => {
      // Simuler une réponse API (à remplacer par fetch ou axios)
      setMetiers([
        {
          id: 1,
          nom: 'Plombier',
          description: 'Le plombier est un spécialiste du mouvement des fluides : c\'est lui qui trouve le placement optimum des tuyauteries lors de la construction ou de la rénovation d\'un bâtiment. Il peut également être amené à travailler en urgence, en cas de panne ou de fuite chez les particuliers, comme dans les entreprises.',
          imageUrl: '/images/metiers/plombier.jpg',
        },
        {
          id: 2,
          nom: 'Électricien',
          description: 'Le plombier est un spécialiste du mouvement des fluides : c\'est lui qui trouve le placement optimum des tuyauteries lors de la construction ou de la rénovation d\'un bâtiment. Il peut également être amené à travailler en urgence, en cas de panne ou de fuite chez les particuliers, comme dans les entreprises.',
          imageUrl: '/images/metiers/electricien.jpg',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Liste de métiers</h2>
          <button
            onClick={() => navigate('/metiers')}
            className="text-blue-500 hover:underline text-sm"
          >
            voir tout
          </button>
        </div>

        {/* Loader */}
        {loading ? (
          <p className="text-center text-gray-400">Chargement des métiers...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {metiers.map((metier) => (
              <div
                key={metier.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition"
              >
                <img
                  src={metier.imageUrl}
                  alt={metier.nom}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{metier.nom}</h3>
                  <p className="text-sm text-gray-600">{metier.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
