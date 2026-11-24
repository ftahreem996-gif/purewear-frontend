import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-b border-pistachio">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Left — Hi {name} with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-purple-dark text-sm font-medium hover:text-purple transition flex items-center gap-1"
            >
              Hi, {user.name}
              <span className="text-xs">▼</span>
            </button>
          ) : (
            <span className="text-purple-dark text-sm"> </span>
          )}

          {dropdownOpen && user && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-pistachio py-2 min-w-[150px] z-50">
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-purple-dark hover:bg-purple/10 hover:text-purple transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Center — Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-purple-dark hover:text-purple transition-colors duration-300 text-sm tracking-widest uppercase font-medium"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-purple-dark hover:text-purple transition-colors duration-300 text-sm tracking-widest uppercase font-medium"
          >
            Products
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-purple text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-dark transition-colors duration-300 text-sm tracking-widest uppercase"
            >
              Admin
            </Link>
          )}

          {!user && (
            <Link
              to="/login"
              className="bg-purple text-white px-5 py-2 rounded-full font-semibold hover:bg-purple-dark transition-colors duration-300 text-sm tracking-widest uppercase"
            >
              Login
            </Link>
          )}
        </div>

        {/* Right — Wishlist + Cart */}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative">
            <span className="text-2xl">🤍</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;