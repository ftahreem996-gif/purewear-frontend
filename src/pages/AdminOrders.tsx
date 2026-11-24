import { useEffect, useState } from 'react';
import API from '../api/axios';
import type { IOrder } from '../types';

const AdminOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await API.get('/orders');
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      fetchOrders();
      setMessage('✅ Status updated successfully!');
    } catch (error) {
      setMessage('❌ Status update failed');
    }
  };

  const statusColors: any = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div>
      <h2
        className="text-2xl font-bold text-charcoal mb-6"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Orders ({orders.length})
      </h2>

      {message && (
        <p className="mb-4 p-3 bg-white/60 rounded-xl text-sm text-charcoal">{message}</p>
      )}

      {orders.length === 0 ? (
        <p className="text-charcoal/60 text-center py-12">
          No orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-glitter/40"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-charcoal text-lg">
                    {order.customerName}
                  </h3>
                  <p className="text-sm text-charcoal/60">
                    📱 {order.phone} | 📍 {order.address}, {order.city} {order.postalCode}
                  </p>
                  <p className="text-xs text-charcoal/40 mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-rose">
                    Rs. {order.totalPrice.toLocaleString()}
                  </p>
                  <span
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-glitter/40">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-charcoal/70">
                      {item.name} ({item.color}, {item.size}) × {item.quantity} — Rs.{' '}
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 flex-wrap">
                {['Pending', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(order._id, status)}
                    disabled={order.status === status}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                      order.status === status
                        ? 'bg-rose text-white'
                        : 'bg-charcoal/5 text-charcoal/60 hover:bg-rose/20'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;