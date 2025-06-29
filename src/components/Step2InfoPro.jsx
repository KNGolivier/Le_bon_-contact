import React, { useEffect, useState } from 'react';

export default function Step2InfoPro({ formData, handleChange, nextStep, prevStep }) {
  const [metiers, setMetiers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/metiers')
      .then(res => res.json())
      .then(data => setMetiers(data))
      .catch(() => setMetiers([]));
  }, []);

  return (
    <div className="space-y-4">
      {/* Adresse */}
      <div>
        <label className="block text-sm font-semibold mb-1">Adresse</label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          required
          className="w-full border border-blue-400 rounded px-4 py-2"
        />
      </div>

      {/* Identité */}
      <div>
        <label className="block text-sm font-semibold mb-1">Numéro pièce d'identité (CNI, passport)</label>
        <input
          type="text"
          name="identite"
          value={formData.identite}
          onChange={handleChange}
          required
          className="w-full border border-blue-400 rounded px-4 py-2"
        />
      </div>

      {/* Métier */}
<div>
  <label className="block text-sm font-semibold mb-1">Métier</label>
<select
  name="nomMetier"
  value={formData.nomMetier}
  onChange={handleChange}
  required
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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
