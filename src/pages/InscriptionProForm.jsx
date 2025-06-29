import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1InfoPerso from '../components/Step1InfoPerso';
import Step2InfoPro from '../components/Step2InfoPro';
import Step3Credentials from '../components//Step3Credentials';
import logo from '../assets/logo.png'; 

export default function InscriptionProForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    numero: '',
    adresse: '',
    identite: '',
    nomMetier: '',
    urlProfile: null,
    motDePasse: '',
    confirmPassword: '',
    accepted: false
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const nextStep = () => {
    // Validation par étape
    if (step === 1) {
      const { nom, prenom, email, numero } = formData;
      if (!nom || !prenom || !email || !numero) {
        setMessage('❗Veuillez remplir tous les champs de l\'étape 1.');
        return;
      }
    }
    if (step === 2) {
      const { adresse, identite, nomMetier } = formData;
      if (!adresse || !identite || !nomMetier) {
        setMessage('❗Veuillez remplir tous les champs de l\'étape 2.');
        return;
      }
    }

    setMessage('');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.accepted) {
      setMessage("❗Vous devez accepter les conditions.");
      return;
    }

    if (formData.motDePasse !== formData.confirmPassword) {
      setMessage("❗Les mots de passe ne correspondent pas.");
      return;
    }

    const dataToSend = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      numero: formData.numero,
      motDePasse: formData.motDePasse,
      adresse: formData.adresse,
      identite: formData.identite,
      nomMetier: formData.nomMetier
    };
console.log("✅ Données envoyées :", dataToSend);

    try {
      const res = await fetch('http://localhost:8080/api/auth/pro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (res.ok) {
        setMessage("✅ Inscription réussie !");
        setTimeout(() => {
          navigate('/connexion');
        }, 1500);
      } else {
        const json = await res.json();
        setMessage(`❌ Erreur : ${json.error || "Inscription échouée"}`);
      }
    } catch (err) {
      setMessage("❌ Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image gauche */}
      <div className="w-1/2 hidden md:block">
        <img
          src="../images/register-client.png"
          alt="Client"
          className="h-146 w-full object-cover"
        />
      </div>

      {/* Formulaire à droite */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12">
       <div className=" mb-6">
                <img src={logo} alt="Logo" className="w-25 object-contain" />
              </div>
        <h1 className="text-2xl font-bold mb-1">Bienvenue Professionnel </h1>
        <p className="text-gray-600 mb-6">Complétez les étapes pour rejoindre la plateforme</p>

        {message && <p className="text-sm text-center text-red-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <Step1InfoPerso formData={formData} handleChange={handleChange} nextStep={nextStep} />
          )}
          {step === 2 && (
            <Step2InfoPro
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <Step3Credentials
              formData={formData}
              handleChange={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          )}
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
