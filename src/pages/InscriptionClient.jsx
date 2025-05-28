import React, { useState } from 'react';


export default function InscriptionClient() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numero: '',
    motDePasse: '',
    confirmPassword: '',
    urlProfile: ''
  });

  const [accepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accepted) {
      setMessage("❗Vous devez accepter les conditions.");
      return;
    }

    if (formData.motDePasse !== formData.confirmPassword) {
      setMessage("❗Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          numero: formData.numero,
          urlProfile: formData.urlProfile || '',
          motDePasse: formData.motDePasse
        })
      });

      if (response.ok) {
        setMessage("✅ Inscription réussie !");
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          numero: '',
          urlProfile: '',
          motDePasse: '',
          confirmPassword: ''
        });
        setAccepted(false);
      } else {
        const data = await response.json();
        setMessage(`❌ Erreur : ${data.message || "inscription échouée"}`);
      }
    } catch (err) {
      setMessage("❌ Erreur serveur ou réseau.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image gauche */}
      <div className="w-1/2 hidden md:block">
        <img
          src="../images/register-client.png"
          alt="Client"
          className="h-147  w-full object-cover"
        />
      </div>

      {/* Formulaire */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12">
        <h1 className="text-2xl font-bold mb-1">BIENVENU !!</h1>
        <p className="text-gray-600 mb-6">Rejoignez la communauté</p>

        {message && <p className="text-sm text-center text-red-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom + Prénom */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1">Nom(s)</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded px-4 py-2"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1">Prénom(s)</label>
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded px-4 py-2"
                placeholder="Votre prénom"
                required
              />
            </div>
          </div>

          {/* Email + Numéro */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded px-4 py-2"
                placeholder="Votre email"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold mb-1">Téléphone</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="w-full border border-blue-400 rounded px-4 py-2"
                placeholder="Votre numéro"
                required
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-bold mb-1">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className="w-full border border-blue-400 rounded px-4 py-2"
              placeholder="Mot de passe"
              required
            />
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label className="block text-sm font-bold mb-1">Confirmation mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-blue-400 rounded px-4 py-2"
              placeholder="Confirmez le mot de passe"
              required
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
            />
            <label className="text-sm font-semibold">
              J'accepte les conditions d'utilisations et la politique de confidentialité
            </label>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-[#00AEEF] text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Inscription
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Vous avez déjà un compte ?{" "}
          <a href="/connexion" className="text-blue-600 underline">
            Connectez-vous !
          </a>
        </p>
      </div>
    </div>
  );
}
