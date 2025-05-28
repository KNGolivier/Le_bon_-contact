import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AjouterRealisation() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ou selon ton stockage
    const res = await fetch("http://localhost:8080/api/realisations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        titre,
        description,
        urlImage
      }),
    });

    if (res.ok) {
      alert("Réalisation ajoutée avec succès !");
      navigate(-1); // retourne à la page précédente
    } else {
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Nouvelle Réalisation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titre"
          className="w-full p-2 border rounded"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de l'image"
          className="w-full p-2 border rounded"
          value={urlImage}
          onChange={(e) => setUrlImage(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
