import React, { useState } from 'react';

export default function Step3Credentials({ formData, handleChange, prevStep, handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Fonction pour vérifier la force du mot de passe
  const evaluatePasswordStrength = (password) => {
    if (!password) return '';
    if (password.length < 6) return 'Faible';
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) return 'Fort';
    return 'Moyen';
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
    const strength = evaluatePasswordStrength(e.target.value);
    setPasswordStrength(strength);
  };

  return (
    <div className="space-y-4">
      {/* Mot de passe */}
      <div>
        <label className="block text-sm font-semibold mb-1">Mot de passe</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handlePasswordChange}
            required
            className="w-full border border-blue-400 rounded px-4 py-2 pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {passwordStrength && (
          <p className={`text-sm mt-1 ${passwordStrength === 'Faible' ? 'text-red-500' : passwordStrength === 'Moyen' ? 'text-yellow-500' : 'text-green-600'}`}>
            Force du mot de passe : {passwordStrength}
          </p>
        )}
      </div>

      {/* Confirmation mot de passe */}
      <div>
        <label className="block text-sm font-semibold mb-1">Confirmer le mot de passe</label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-blue-400 rounded px-4 py-2 pr-10"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
          >
            {showConfirm ? "🙈" : "👁️"}
          </span>
        </div>
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
