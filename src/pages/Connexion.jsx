import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

export default function Connexion() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:8080/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse })
      });

      if (response.ok) {
        const data = await response.json();
        // Stockage du token si tu en reçois un
        // localStorage.setItem("token", data.token);
        setMessage("✅ Connexion réussie !");
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/Home');
      } else {
        const err = await response.json();
        setMessage(err.message || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      setMessage("Erreur serveur ou réseau.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image gauche */}
      <div className="w-1/2 hidden md:block">
        <img
          src="../images/register-client.png"
          alt="Connexion"
          className="h-147 w-full object-cover"
        />
      </div>

      {/* Formulaire */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-40 object-contain" />
        </div>

        <h1 className="text-2xl font-bold mb-1">Heureux de vous revoir !</h1>
        <p className="text-gray-600 mb-6">Connectez-vous en un clic</p>

        {message && <p className="text-sm text-center text-red-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-blue-400 rounded px-4 py-2"
              placeholder="Saisir votre adresse email"
              required
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label className="block text-sm font-bold mb-1">Mot de Passe</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="w-full border border-blue-400 rounded px-4 py-2 pr-10"
                placeholder="Saisir votre mot de passe"
                required
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </span>
            </div>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-[#00AEEF] text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Vous n'avez pas de compte ?{" "}
          <a href="/inscription" className="text-blue-600 underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
