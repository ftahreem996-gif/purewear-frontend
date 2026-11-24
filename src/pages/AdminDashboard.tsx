import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'products' | 'orders'>('products');

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-rose text-sm tracking-[0.3em] uppercase mb-3">
            Control Room
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Admin Panel
          </h1>
          <p className="text-charcoal/60 mt-2">Welcome, {user.name}</p>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setTab('products')}
            className={`px-8 py-3 rounded-full font-semibold tracking-wider uppercase text-sm transition ${
              tab === 'products'
                ? 'bg-rose text-white shadow-lg'
                : 'bg-white/50 text-charcoal border border-glitter/50 hover:border-rose/50'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setTab('orders')}
            className={`px-8 py-3 rounded-full font-semibold tracking-wider uppercase text-sm transition ${
              tab === 'orders'
                ? 'bg-rose text-white shadow-lg'
                : 'bg-white/50 text-charcoal border border-glitter/50 hover:border-rose/50'
            }`}
          >
            Orders
          </button>
        </div>

        {tab === 'products' ? <AdminProducts /> : <AdminOrders />}

        <div className="text-center mt-12">
          <Link to="/" className="text-charcoal/60 hover:text-rose text-sm transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;