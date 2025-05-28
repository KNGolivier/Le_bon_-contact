import React, { useEffect, useState } from 'react';

export default function MetiersManager() {
  const [metiers, setMetiers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    nom: '',
    description: '',
    urlImage: '',
    nomCategorie: ''
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/metiers')
      .then(res => res.json())
      .then(setMetiers);

    fetch('http://localhost:8080/api/v1/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const url = editing
      ? `http://localhost:8080/api/v1/metiers/${editing.id}`
      : 'http://localhost:8080/api/v1/metiers';

    const method = editing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      const result = await response.json();
      if (editing) {
        setMetiers((prev) =>
          prev.map((m) => (m.id === result.id ? result : m))
        );
        setEditing(null);
      } else {
        setMetiers((prev) => [...prev, result]);
      }
      setForm({ nom: '', description: '', urlImage: '', nomCategorie: '' });
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm('Supprimer ce métier ?');
    if (!ok) return;

    const res = await fetch(`http://localhost:8080/api/v1/metiers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (res.ok) {
      setMetiers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestion des métiers</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow max-w-xl space-y-4 mb-6">
        <div>
          <label className="block text-sm">Nom</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Image (URL)</label>
          <input
            type="text"
            name="urlImage"
            value={form.urlImage}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Catégorie</label>
          <select
            name="nomCategorie"
            value={form.nomCategorie}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.nom}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editing ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>

      {/* Liste des métiers */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metiers.map((m) => (
          <div key={m.id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
            <img src={m.urlImage} alt={m.nom} className="h-40 w-full object-cover rounded" />
            <h4 className="text-lg font-semibold">{m.nom}</h4>
            <p className="text-sm text-gray-600">{m.description}</p>
            <p className="text-sm italic text-gray-400">Catégorie : {m.nomCategorie}</p>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setEditing(m);
                  setForm({
                    nom: m.nom,
                    description: m.description,
                    urlImage: m.urlImage,
                    nomCategorie: m.nomCategorie
                  });
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
