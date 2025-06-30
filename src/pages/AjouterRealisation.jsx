import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AjouterRealisation() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:8080/api/v1/realisations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        alert('Réalisation ajoutée avec succès !');
        navigate(-1);
      } else {
        const errorText = await res.text();
        alert('Erreur lors de l\'ajout : ' + errorText);
      }
    } catch (error) {
      console.error('Erreur :', error);
      alert('Erreur réseau ou serveur.');
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
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
