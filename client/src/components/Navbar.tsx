import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  const linkClass: (path: string) => string = (path: string) =>
    `px-4 py-2 rounded text-base font-lg ${
      pathname === path ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'text-indigo-600 hover:bg-indigo-100'
    }`;

  return (
    <nav className="w-full bg-black font-bold shadow p-4 flex justify-center gap-4 mb-4">
      <Link to="/" className={linkClass('/')}>Home</Link>
      <Link to="/favorites" className={linkClass('/favorites')}>Favorites</Link>
    </nav>
  );
}

export default Navbar;
