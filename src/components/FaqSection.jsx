import React, { useState } from 'react';

export default function FaqSection() {
  const faqData = [
    {
      question: "Qui sommes nous ?",
      answer: "Le Bon Contact est une plateforme qui connecte clients et artisans pour des services de proximité.",
    },
    {
      question: "Comment fonctionne l'application ?",
      answer: "Les utilisateurs peuvent rechercher un métier, contacter un professionnel, et publier ou réserver un service.",
    },
    {
      question: "Comment créer un compte  ?",
      answer: "Cliquez sur 'S'inscrire't remplissez le formulaire.",
    },
    {
      question: "Comment puis-je contacter un artisan ?",
      answer: "Cliquez sur le profil d’un artisan et récupérer les infos nécessaires.",
    },
    {
      question: "Quels moyens de paiement sont disponibles ?",
      answer: "Les paiements peuvent se faire en ligne , selon les préférences de l’artisan.",
    },
    {
      question: "Que faire si je rencontre un problème avec un utilisateur ?",
      answer: "Contactez notre équipe via le formulaire de contact .",
    },
    {
      question: "Mes données personnelles sont-elles protégées ?",
      answer: "Oui, vos données sont sécurisées et utilisées uniquement dans le cadre du service.",
    },
   
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-[#edf4fa] py-10 px-4 md:px-20">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index}>
            <div
              className="flex justify-between items-center border-b border-gray-300 py-3 font-medium cursor-pointer hover:text-blue-600"
              onClick={() => toggleAnswer(index)}
            >
              <span>{item.question}</span>
              <span className="text-xl">
                {activeIndex === index ? '▲' : '▼'}
              </span>
            </div>
            {activeIndex === index && (
              <div className="py-2 text-gray-700">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 text-blue-400 font-semibold text-center">
        Vous avez d'autres questions ?{" "}
        <a href="/contact" className="underline">Contactez-nous !</a>
      </div>
    </div>
  );
}
