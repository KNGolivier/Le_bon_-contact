import React, { useEffect, useState } from 'react';

export default function Step1InfoPerso({ formData, handleChange, nextStep }) {
  const [emailError, setEmailError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // Email : valider uniquement quand on quitte le champ
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      setEmailError("Adresse email invalide");
    } else {
      setEmailError('');
    }
  };

  // Vérifier si tout est prêt pour passer à l'étape suivante
  useEffect(() => {
    const { nom, prenom, email, numero } = formData;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsValid(nom && prenom && email && numero && emailValid);
  }, [formData, emailError]);

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
            onBlur={() => {
              setEmailTouched(true);
              validateEmail();
            }}
            required
            className="w-full border border-blue-400 rounded px-4 py-2"
          />
          {emailTouched && emailError && (
            <p className="text-sm text-red-600 mt-1">{emailError}</p>
          )}
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
         {/* Photo de profil */}
      <div>
        <label className="block text-sm font-semibold mb-1">Photo de profil</label>
        <input
          type="file"
          name="urlProfile"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full border cursor-pointer border-blue-400 rounded px-4 py-2"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextStep}
          disabled={!isValid || !!emailError}
          className={`px-6 py-2 rounded transition ${
            isValid && !emailError
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
