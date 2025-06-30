import React, { useEffect, useState } from 'react';

export default function Step2InfoPro({ formData, handleChange, nextStep, prevStep }) {
  const [metiers, setMetiers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/metiers')
      .then(res => res.json())
      .then(data => setMetiers(data))
      .catch(() => setMetiers([]));
  }, []);

  // Validation de l'étape
  const isStepValid = () =>
    formData.adresse &&
    formData.identite &&
    formData.typePiece &&
    formData.nomMetier &&
    formData.urlProfile &&
    formData.pieceJointe;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Informations professionnelles</h2>

      {/* Adresse */}
      <div>
        <label className="block text-sm font-semibold mb-1">Adresse</label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          className="w-full border border-blue-400 rounded px-4 py-2"
        />
      </div>

      {/* Type de pièce */}
      <div>
        <label className="block text-sm font-semibold mb-1">Type de pièce d'identité</label>
        <select
          name="typePiece"
          value={formData.typePiece || ''}
          onChange={handleChange}
          className="w-full border border-blue-400 rounded px-4 py-2"
        >
          <option value="">-- Sélectionnez un type --</option>
          <option value="CNI">Carte Nationale d'Identité</option>
          <option value="PASSPORT">Passeport</option>
          <option value="PERMIS">Permis de conduire</option>
        </select>
      </div>

      {/* Numéro de pièce */}
      <div>
        <label className="block text-sm font-semibold mb-1">Numéro de la pièce</label>
        <input
          type="text"
          name="identite"
          value={formData.identite}
          onChange={handleChange}
          className="w-full border border-blue-400 rounded px-4 py-2"
        />
      </div>

      {/* Fichier de la pièce */}
      <div>
        <label className="block text-sm font-semibold mb-1">Téléverser la pièce d'identité</label>
        <input
          type="file"
          name="pieceJointe"
          accept="image/*,application/pdf"
          onChange={handleChange}
          className="w-full border border-blue-400 cursor-pointer rounded px-4 py-2"
        />
        {formData.pieceJointe && (
          <p className="text-sm text-green-600 mt-1">Nom : {formData.pieceJointe.name}</p>
        )}
      </div>

      {/* Métier */}
      <div>
        <label className="block text-sm font-semibold mb-1">Métier</label>
        <select
          name="nomMetier"
          value={formData.nomMetier}
          onChange={handleChange}
          className="w-full border border-blue-400 rounded px-4 py-2"
        >
          <option value="">-- Sélectionnez un métier --</option>
          {metiers.map((metier, index) => (
            <option key={index} value={metier.nom}>
              {metier.nom}
            </option>
          ))}
        </select>
      </div>

     

      {/* Boutons navigation */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Précédent
        </button>
        <button
          type="button"
          onClick={nextStep}
          disabled={!isStepValid()}
          className={`px-6 py-2 rounded text-white transition ${
            isStepValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
