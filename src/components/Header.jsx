import logo2 from '../assets/logo2.png'; 
import { Globe } from 'lucide-react'; 
import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false);


  return (
    <header className="bg-[#00AEEF] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
 <Link to="/" className="flex items-center space-x-2">
  <img src={logo2} alt="Logo" className="w-32 object-contain cursor-pointer" />
</Link>


        {/* Menu */}
        <nav className="flex items-center space-x-6 text-sm font-medium text-black">
        
          <a href="#" className="flex items-center gap-1"><Globe size={16} /> Français</a>
          <a href="#">Devenir Pro</a>
          
          {user && user.urlProfile ? (
    <div className="relative">
  <img
    src={user.urlProfile}
    alt="Profil"
    onClick={() => setShowMenu(!showMenu)}
    className="w-8 h-8 rounded-full object-cover cursor-pointer"
  />

  {showMenu && (
    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-10 text-sm text-gray-800">
      <button
        onClick={() => {
          setShowMenu(false);
          navigate('/profil');
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        Voir profil
      </button>
      <button
        onClick={() => {
          localStorage.removeItem('user');
          setShowMenu(false);
          navigate('/');
        }}
        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
      >
        Se déconnecter
      </button>
    </div>
  )}
</div>
) : (
  <>
    <Link to="/connexion" className="text-white font-semibold">Se connecter</Link>
    <Link
      to="/inscription-client"
      className="border border-white text-white px-3 py-1 rounded hover:bg-white hover:text-[#00AEEF] transition"
    >
      S'inscrire
    </Link>
  </>
)}

        </nav>
      </div>
    </header>
  );
}
