import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api/axios';
import type { IProduct } from '../types';
import ProductCard from '../components/ProductCard';

const categories = ['Handmade Thread Work', 'Tie N Dye', 'Metallic Thread Work'];

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Products fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-purple text-xs tracking-[0.5em] uppercase mb-4">
            The Collection
          </p>
          <h1
            className="text-5xl md:text-6xl font-light text-purple-dark tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {categoryFilter || 'All Pieces'}
          </h1>
          <div className="w-24 h-px bg-purple mx-auto mt-6" />
        </div>

        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-white/60 text-purple-dark placeholder-purple-dark/40 border border-pistachio focus:border-purple/50 focus:outline-none"
          />
        </div>

        {loading ? (
          <p className="text-center text-purple-dark/40">Loading...</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-purple-dark/40">
            {searchQuery ? 'No products found.' : 'No products yet.'}
          </p>
        ) : (
          <>
            {!categoryFilter && !searchQuery ? (
              <div className="space-y-20">
                {categories.map((cat) => {
                  const catProducts = filteredProducts.filter((p) => p.category === cat);
                  if (catProducts.length === 0) return null;
                  return (
                    <div key={cat}>
                      <h2
                        className="text-2xl font-light text-purple-dark/80 mb-8 tracking-widest uppercase"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {cat}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {catProducts.map((product) => (
                          <ProductCard key={product._id} product={product} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;