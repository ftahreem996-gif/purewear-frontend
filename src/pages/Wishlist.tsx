import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-cream pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-6">🤍</p>
          <h1
            className="text-4xl font-bold text-charcoal mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your Wishlist is Empty
          </h1>
          <p className="text-charcoal/60 mb-8">
            Save your favorite products to see them here.
          </p>
          <Link
            to="/products"
            className="inline-block bg-rose text-white px-10 py-4 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-rose-dark transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-rose text-sm tracking-[0.3em] uppercase mb-3">
            Your Favorites
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-charcoal"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Wishlist
          </h1>
          <p className="text-charcoal/60 mt-2">
            {wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-glitter/40 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.colors[0]?.image || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xl hover:bg-white transition"
                >
                  ❤️
                </button>
              </div>
              <div className="p-4">
                <h3
                  className="text-lg font-bold text-charcoal"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {product.name}
                </h3>
                <p className="text-rose font-semibold mt-1">
                  Rs. {product.price.toLocaleString()}
                </p>
                <Link
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  className="inline-block mt-3 text-charcoal/60 text-sm hover:text-rose transition"
                >
                  View Product →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;