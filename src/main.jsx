import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Categories from './pages/Categories';
import CategorieDetailPage from './pages/CategorieDetailPage';
import InscriptionProForm from './pages/InscriptionProForm';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import MetierDetailsPage from './pages/MetierDetailsPage'; 
import ProfilPro from './pages/ProfilPro';
import EditProfil from './pages/EditProfil';
import AjouterRealisation from './pages/AjouterRealisation';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:nomCategorie" element={<CategorieDetailPage />} />
        <Route path="/inscription" element={<InscriptionProForm />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/metiers/:nomMetier" element={<MetierDetailsPage />} />
       <Route path="/profil-pro/:email" element={<ProfilPro />} />
       <Route path="/edit-profil" element={<EditProfil />} />
       <Route path="/ajouter-realisation" element={<AjouterRealisation />} />



        


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
