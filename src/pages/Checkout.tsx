import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axios';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const items = cart.map((item) => ({
        productId: item.product._id,
        name: item.product.name,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.colors.find((c) => c.name === item.color)?.image || item.product.colors[0]?.image,
      }));

      await API.post('/orders', {
        ...form,
        items,
        totalPrice,
      });

      clearCart();
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-6">🎉</p>
          <h1
            className="text-4xl font-bold text-charcoal mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Order Placed Successfully!
          </h1>
          <p className="text-charcoal/60 mb-8 leading-relaxed">
            Thank you for your order! We will contact you shortly. Payment will be
            collected on delivery (COD).
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-rose text-white px-10 py-4 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-rose-dark transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-6">🛒</p>
          <h1
            className="text-3xl font-bold text-charcoal mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your Cart is Empty
          </h1>
          <p className="text-charcoal/60">Add some products before checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-rose text-sm tracking-[0.3em] uppercase mb-3">
            Almost There
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-glitter/40">
              <h2
                className="text-2xl font-bold text-charcoal mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Delivery Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-glitter/60 bg-white/60 focus:border-rose focus:outline-none transition"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-glitter/60 bg-white/60 focus:border-rose focus:outline-none transition"
                    placeholder="+92 300 1234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-glitter/60 bg-white/60 focus:border-rose focus:outline-none transition"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-glitter/60 bg-white/60 focus:border-rose focus:outline-none transition"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-glitter/60 bg-white/60 focus:border-rose focus:outline-none transition"
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-rose/10 rounded-xl border border-rose/20">
                <p className="text-sm text-charcoal/70">
                  💳 <strong>Payment Method:</strong> Cash on Delivery (COD)
                </p>
              </div>

              {error && (
                <p className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-purple text-white py-4 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-purple-dark transition disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Place Order (COD)'}
              </button>
            </div>
          </form>

          <div className="lg:col-span-1">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-glitter/40 sticky top-24">
              <h2
                className="text-2xl font-bold text-charcoal mb-4"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Your Order
              </h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-charcoal/70">
                      {item.product.name} ({item.color}, {item.size}) × {item.quantity}
                    </span>
                    <span className="text-charcoal font-semibold">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-glitter/40 pt-4 flex justify-between font-bold text-charcoal">
                <span>Total</span>
                <span className="text-rose text-xl">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;