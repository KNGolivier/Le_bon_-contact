import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-600 hover:text-white ${
      pathname === path ? 'bg-blue-500 text-white' : 'text-gray-700'
    }`;

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-xl text-blue-600">LeBonContact</div>
      <nav className="space-y-1 mt-4">


<Link to="/dashboard">🏠 Accueil</Link>
<Link to="/dashboard/categories">📂 Catégories</Link>
<Link to="/dashboard/metiers">🛠️ Métiers</Link>

      </nav>
    </aside>
  );
}
