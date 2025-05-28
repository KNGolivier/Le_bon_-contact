import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png'; 
export default function HeaderConnexion() {
  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <header className="bg-white px-4 py-4 mb-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
         {/* Logo + recherche */}
                <div className="flex items-center gap-4">
                  <img src={logo} alt="Logo" className="w-20 md:w-24" />
        
                  <div className="hidden md:block">
                    <input
                      type="text"
                      placeholder="Recherche"
                      className="border rounded w-90 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>

        {/* Liens menu */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="#"  className="underline text- #00AEEF">Découvrir</Link>
          <Link to="#">Devenir Pro</Link>
          <Link to="#" className="flex items-center gap-1 text-black"> <Globe size={16} /> Francais</Link>
          <Link to="#">Messagerie</Link>
          <Link to="/profil">Profile</Link>

          {/* Avatar */}
          {user?.urlProfile && (
            <img
              src={user.urlProfile}
              alt="profil"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
        </nav>
      </div>
    </header>
  );
}
