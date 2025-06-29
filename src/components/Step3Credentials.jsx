import React from 'react';

export default function Step3Credentials({ formData, handleChange, prevStep, handleSubmit }) {
  return (
    <div className="space-y-4">
      {/* Mot de passe */}
      <div>
        <label className="block text-sm font-semibold mb-1">Mot de passe</label>
        <input
          type="password"
          name="motDePasse"
          value={formData.motDePasse}
          onChange={handleChange}
          required
          className="w-full border border-blue-400 rounded px-4 py-2"
        />
      </div>

      {/* Confirmation mot de passe */}
      <div>
        <label className="block text-sm font-semibold mb-1">Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border border-blue-400 rounded px-4 py-2"
        />
      </div>

      {/* Conditions d'utilisation */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="accepted"
          checked={formData.accepted}
          onChange={handleChange}
          required
        />
        <label className="text-sm font-medium">
          J'accepte les conditions d'utilisation et la politique de confidentialité.
        </label>
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
          type="submit"
          className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Valider l'inscription
        </button>
      </div>
    </div>
  );
}
