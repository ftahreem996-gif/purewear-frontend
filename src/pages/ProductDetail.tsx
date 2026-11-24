import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import type { IProduct } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedColor(res.data.colors[0]);
        setSelectedSize(res.data.sizes[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-purple-dark/40">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h1 className="text-2xl font-bold text-purple-dark mb-4">Product Not Found</h1>
          <Link to="/products" className="text-purple hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart({
      product,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* X (Close) Button — Top Far Right, Blended with Background */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-cream/80 border border-purple-dark/10 text-purple-dark text-2xl hover:bg-purple hover:text-white transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* 2 Column Layout — Image Left, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-items-center">
          {/* LEFT SIDE — Model Image */}
          <div className="order-1 w-full">
            <div className="relative h-[85vh] w-full flex items-center justify-center">
              <h2
                className="absolute text-[15vw] font-bold text-purple-dark/5 select-none pointer-events-none"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                01
              </h2>

              <img
                src={selectedColor.image}
                alt={product.name}
                className="relative z-10 h-full w-auto object-contain"
              />
            </div>
          </div>

          {/* RIGHT SIDE — Details */}
          <div className="order-2 w-full">
            <p className="text-purple text-xs tracking-[0.4em] uppercase mb-2">
              {product.category}
            </p>

            <h1
              className="text-2xl md:text-3xl font-bold text-purple-dark mb-3"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {product.name}
            </h1>

            <p className="text-xl text-purple font-semibold mb-4">
              Rs. {product.price.toLocaleString()}
            </p>

            <div className="w-full h-px bg-pistachio mb-5" />

            <p className="text-purple-dark/70 text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Grid */}
            <div className="mb-5">
              <h4 className="text-purple-dark font-semibold mb-2 text-xs tracking-wider uppercase">
                Color: <span className="text-purple">{selectedColor.name}</span>
              </h4>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-md overflow-hidden border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-purple shadow-lg scale-105'
                        : 'border-pistachio hover:border-purple/50'
                    }`}
                  >
                    <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Grid */}
            <div className="mb-5">
              <h4 className="text-purple-dark font-semibold mb-2 text-xs tracking-wider uppercase">
                Size: <span className="text-purple">{selectedSize}</span>
              </h4>
              <div className="flex gap-1.5 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2 py-1 rounded-md border text-[10px] font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-purple text-white border-purple'
                        : 'bg-white/60 text-purple-dark border-pistachio hover:border-purple/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-5">
              <h4 className="text-purple-dark font-semibold mb-2 text-xs tracking-wider uppercase">
                Quantity
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 rounded-md bg-white/60 border border-pistachio text-purple-dark text-sm hover:bg-purple hover:text-white transition"
                >
                  −
                </button>
                <span className="text-sm font-bold text-purple-dark w-5 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 rounded-md bg-white/60 border border-pistachio text-purple-dark text-sm hover:bg-purple hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="border-t border-pistachio pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-2 px-6 rounded-full font-semibold tracking-wider uppercase text-xs transition-all duration-300 ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-purple text-white hover:bg-purple-dark hover:scale-[1.02]'
                  }`}
                >
                  {added ? '✓ Added!' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleWishlist}
                  className="w-9 h-9 rounded-full bg-white/60 border border-pistachio flex items-center justify-center text-base hover:bg-white transition"
                >
                  {inWishlist ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;