import React from 'react';

export default function Step1InfoPerso({ formData, handleChange, nextStep }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full border border-blue-400 rounded px-4 py-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="w-full border border-blue-400 rounded px-4 py-2"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-blue-400 rounded px-4 py-2"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-semibold mb-1">Numéro</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="w-full border border-blue-400 rounded px-4 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
