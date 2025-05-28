import React, { useEffect, useState } from 'react';

export default function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [urlIcone, setUrlIcone] = useState('');
  const [editing, setEditing] = useState(null); // contient la catégorie à modifier

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/categories', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Erreur chargement catégories :', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editing ? 'PUT' : 'POST';
    const url = editing
      ? `http://localhost:8080/api/v1/categories/${editing.id}`
      : 'http://localhost:8080/api/v1/categories';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ nom, description, urlIcone }),
    });

    if (response.ok) {
      const updated = await response.json();
      if (editing) {
        setCategories((prev) =>
          prev.map((cat) => (cat.id === updated.id ? updated : cat))
        );
        setEditing(null);
      } else {
        setCategories((prev) => [...prev, updated]);
      }
      setNom('');
      setDescription('');
      setUrlIcone('');
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette catégorie ?")) return;

    const response = await fetch(`http://localhost:8080/api/v1/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des catégories</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white p-4 rounded shadow max-w-xl">
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">URL icône</label>
          <input
            type="text"
            value={urlIcone}
            onChange={(e) => setUrlIcone(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? 'Mettre à jour' : 'Ajouter la catégorie'}
        </button>
      </form>

      {/* Liste des catégories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <div className="flex items-center gap-3">
              <img src={cat.urlIcone} alt={cat.nom} className="w-10 h-10 object-contain" />
              <div className="flex-1">
                <h4 className="font-semibold">{cat.nom}</h4>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <button
                  onClick={() => {
                    setEditing(cat);
                    setNom(cat.nom);
                    setDescription(cat.description);
                    setUrlIcone(cat.urlIcone);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
