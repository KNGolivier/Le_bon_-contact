import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.length >=1) {
        fetch(`http://localhost:8080/api/v1/metiers/search?query=${searchTerm}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération');
            }
            return response.json();
          })
          .then(data => setSuggestions(data))
          .catch(error => {
            console.error('Erreur :', error);
            setSuggestions([]);
          });
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleClick = (metier) => {
    navigate(`/metiers/${metier.nom}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="bg-white rounded-full px-4 py-2 flex items-center w-full">
        <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M13.293 14.707a8 8 0 111.414-1.414l4.386 4.387a1 1 0 01-1.414 1.414l-4.386-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Rechercher le métier pour votre problème"
          className="flex-1 outline-none text-gray-700 bg-transparent"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute bg-white mt-1 w-full rounded shadow z-10 max-h-64 overflow-y-auto">
          {suggestions.map((m) => (
            <li
              key={m.id}
              onClick={() => handleClick(m)}
              className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
            >
              {m.nom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
