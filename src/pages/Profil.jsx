import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderConnexion from '../components/HeaderConnexion';
import PromotionSection from '../components/PromotionSection';
import Footer from '../components/Footer';

export default function Profil() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const handleAjouterClick = () => {
      navigate('/ajouter-realisation');
    };
  

  return (
    
    <div className="bg-gray-100 min-h-screen ">
        <HeaderConnexion />
      <div className="max-w-3xl mx-auto bg-white rounded shadow overflow-hidden mb-20 ">
        {/* Cover photo */}
        <div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1503264116251-35a269479413")' }}>
          <button className="absolute top-2 right-2 px-3 py-1 bg-white text-sm rounded shadow">Edit Cover Photo</button>
        </div>

        {/* Profile info */}
        <div className="p-6 relative">
          {/* Profile picture */}
          <div className="absolute -top-12 left-6">
            <img
              src={user.urlProfile}
              alt="Photo de profil"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>

          <div className="ml-32 mt-2">
            <h2 className="text-xl font-semibold text-gray-800">{user.nom}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <div className="flex justify-end mt-4">
            <button 
              onClick={() => navigate('/edit-profil')}
            className="px-4 py-2 text-sm border rounded text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
           <div className="mt-6">
        <button
          onClick={handleAjouterClick}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Ajouter une réalisation
        </button>
      </div>
       <PromotionSection />
            <Footer />
    </div>
  );
}
