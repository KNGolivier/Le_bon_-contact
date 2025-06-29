
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Globe, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function HeaderPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white  shadow-sm">
      <div className=" px-15 py-4 max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo + recherche */}
        <div className="flex items-center gap-4">
         <Link to="/">
  <img src={logo}alt="Logo" className="cursor-pointer w-20" />
</Link>


          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Recherche"
              className="border rounded w-90 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <a href="#" className="underline text- #00AEEF">Découvrir</a>
          <a href="#" className="flex items-center gap-1 text-black">
            <Globe size={16} /> Français
          </a>
          <a href="#" className="text-black">Devenir Pro</a>
          <a href="#" className="text-#00AEEF">Se connecter</a>
          <a
            href="#"
            className="bg-[#00AEEF] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            S’inscrire
          </a>
        </nav>

        {/* Menu mobile (bouton) */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-sm text-center font-medium">
          <input
            type="text"
            placeholder="Recherche"
            className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <a href="#" className="underline text-#00AEEF ">Découvrir</a>
          <a href="#" className="flex items-center justify-center gap-1 text-black">
            <Globe size={16} /> Français
          </a>
          <a href="#" className="text-black block">Devenir Pro</a>
          <a href="#" className="text-blue-600 block">Se connecter</a>
          <a
            href="#"
            className="inline-block bg-[#00AEEF] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            S’inscrire
          </a>
        </div>
      )}
    </header>
  );
}
