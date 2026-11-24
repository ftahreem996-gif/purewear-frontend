import { useState } from 'react';
import type { IProduct } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: IProduct;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart({
      product,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#3A3A2E]/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#F5F2EB] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image Side */}
          <div className="relative h-96 md:h-auto">
            <img
              src={selectedColor.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-[#3A3A2E] w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg transition"
            >
              ✕
            </button>
          </div>

          {/* Details Side */}
          <div className="p-8">
            <p className="text-[#6B6B4A] text-xs tracking-[0.3em] uppercase mb-2">
              {product.category}
            </p>
            <h2
              className="text-3xl font-light text-[#3A3A2E] mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {product.name}
            </h2>
            <p className="text-2xl text-[#6B6B4A] font-semibold mb-4">
              Rs. {product.price.toLocaleString()}
            </p>
            <p className="text-[#3A3A2E]/60 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Grid */}
            <div className="mb-6">
              <h4 className="text-[#3A3A2E] font-semibold mb-3 text-sm tracking-wider uppercase">
                Color:{' '}
                <span className="text-[#6B6B4A]">{selectedColor.name}</span>
              </h4>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-[#6B6B4A] shadow-lg scale-105'
                        : 'border-[#3A3A2E]/20 hover:border-[#6B6B4A]/50'
                    }`}
                  >
                    <img
                      src={color.image}
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Grid */}
            <div className="mb-6">
              <h4 className="text-[#3A3A2E] font-semibold mb-3 text-sm tracking-wider uppercase">
                Size: <span className="text-[#6B6B4A]">{selectedSize}</span>
              </h4>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-[#6B6B4A] text-white border-[#6B6B4A]'
                        : 'bg-white/40 text-[#3A3A2E] border-[#3A3A2E]/20 hover:border-[#6B6B4A]/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h4 className="text-[#3A3A2E] font-semibold mb-3 text-sm tracking-wider uppercase">
                Quantity
              </h4>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white/40 border border-[#3A3A2E]/20 text-[#3A3A2E] text-xl hover:bg-[#6B6B4A] hover:text-white transition"
                >
                  −
                </button>
                <span className="text-xl font-bold text-[#3A3A2E] w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white/40 border border-[#3A3A2E]/20 text-[#3A3A2E] text-xl hover:bg-[#6B6B4A] hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total + Add to Cart */}
            <div className="border-t border-[#3A3A2E]/10 pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#3A3A2E] font-semibold">Total:</span>
                <span className="text-2xl font-bold text-[#6B6B4A]">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-full font-semibold tracking-wider uppercase text-sm transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-[#6B6B4A] text-white hover:bg-[#5A5A3E] hover:scale-[1.02]'
                }`}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;