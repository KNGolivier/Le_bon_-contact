// src/components/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Youtube } from 'lucide-react';
import logo3 from '../assets/logo3.png'; 

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-1 rounded-xl mb-6 mt-12 mx-10">
      <div className="max-w-7xl mx-auto text-center space-y-6">
        {/* Logo */}
        <img src={logo3} alt="Lebon Contact" className="w-24 mx-auto" />

        {/* Liens */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-light">
          <a href="#">Accueil</a>
          <a href="#">Catégories</a>
          <a href="#">Nouvelles</a>
          <a href="#">À propos</a>
          <a href="#">Pro</a>
          <a href="#">Contact</a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center gap-4 text-white">
          <a href="#"><Facebook size={20} /></a>
          <a href="#"><Twitter size={20} /></a>
          <a href="#"><Youtube size={20} /></a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 mt-4">
          © Copyright 2025 - ESIITECH-Gabon
        </p>
      </div>
    </footer>
  );
}
