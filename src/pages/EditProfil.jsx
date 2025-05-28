import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfil() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [nom, setNom] = useState(user.nom || '');
  const [prenom, setPrenom] = useState(user.prenom || '');
  const [numero, setNumero] = useState(user.numero || '');
  const [urlProfile, setUrlProfile] = useState(user.urlProfile || '');
  const [motDePasse] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 

    try {
        console.log(" Token utilisé :", token);
      const response = await fetch('http://localhost:8080/api/v1/compte', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nom,
          prenom,
          numero,
          urlProfile,
          motDePasse
        })
      });

      if (!response.ok) throw new Error('Erreur lors de la mise à jour');
      const updated = await response.json();

      localStorage.setItem('user', JSON.stringify(updated));
      navigate('/profil');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md w-full max-w-md p-6 space-y-5"
      >
        <h2 className="text-center text-xl font-bold">Modifier mon profil</h2>

        <div>
          <label className="text-sm font-medium">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border-b-2 border-blue-500 p-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border-b-2 border-blue-500 p-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Numéro</label>
          <input
            type="text"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full border-b-2 border-blue-500 p-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Photo de profil</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={urlProfile}
              onChange={(e) => setUrlProfile(e.target.value)}
              className="w-full border p-2 rounded"
            />
            {urlProfile && (
              <img
                src={urlProfile}
                alt="preview"
                className="w-12 h-12 rounded object-cover"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00AEEF] text-white py-2 rounded hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
