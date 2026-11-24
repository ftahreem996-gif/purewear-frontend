import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-6">🛒</p>
          <h1
            className="text-4xl font-bold text-purple-dark mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your Cart is Empty
          </h1>
          <p className="text-purple-dark/60 mb-8">
            Add some products to get started.
          </p>
          <Link
            to="/products"
            className="inline-block bg-purple text-white px-10 py-4 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-purple-dark transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple text-sm tracking-[0.3em] uppercase mb-3">
            Your Selection
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-purple-dark"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Shopping Cart
          </h1>
          <p className="text-purple-dark/60 mt-2">
            {totalItems} item{totalItems > 1 ? 's' : ''} in cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pistachio flex gap-4 items-center"
              >
                <img
                  src={item.product.colors.find((c) => c.name === item.color)?.image || item.product.colors[0]?.image}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3
                    className="text-lg font-bold text-purple-dark"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-purple-dark/60">
                    Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                  </p>
                  <p className="text-purple font-semibold mt-1">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-purple-dark/40 hover:text-purple transition text-2xl"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pistachio sticky top-24">
              <h2
                className="text-2xl font-bold text-purple-dark mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-purple-dark/70">
                  <span>Subtotal</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-purple-dark/70">
                  <span>Delivery</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-pistachio pt-3 flex justify-between font-bold text-purple-dark">
                  <span>Total</span>
                  <span className="text-purple text-xl">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-purple text-white text-center py-4 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-purple-dark transition"
              >
                Checkout
              </Link>
              <Link
                to="/products"
                className="block w-full text-center py-3 mt-2 text-purple-dark/60 text-sm hover:text-purple transition"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;