// src/pages/Welcome.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Home'); // Redirection après 3 secondes
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <img
        src={logo}
        alt="Logo"
        className="w-32 animate-bounce transition-all duration-700"
      />
    </div>
  );
}
