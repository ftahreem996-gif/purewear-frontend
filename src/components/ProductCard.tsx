import { useNavigate } from 'react-router-dom';
import type { IProduct } from '../types';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group cursor-pointer overflow-hidden rounded-lg bg-white/60 border border-pistachio hover:border-purple/40 hover:shadow-xl transition-all duration-500"
    >
      <div className="relative overflow-hidden bg-cream-dark">
        <img
          src={product.colors[0]?.image || product.images[0]}
          alt={product.name}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-purple-dark/0 group-hover:bg-purple-dark/10 transition-all duration-500" />

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xl hover:bg-white transition"
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="pt-4 pb-2 px-2">
        <h3
          className="text-lg font-light text-purple-dark group-hover:text-purple transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {product.name}
        </h3>
        <p className="text-purple text-sm mt-1">Rs. {product.price.toLocaleString()}</p>
        <p className="text-purple-dark/40 text-xs mt-1 tracking-wider uppercase">
          {product.category}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;