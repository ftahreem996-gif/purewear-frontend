import { useEffect, useState } from 'react';
import API from '../api/axios';
import type { IProduct } from '../types';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: 'Handmade Thread Work',
  colors: [{ name: '', image: '' }],
  sizes: '',
  stock: '',
  images: [''],
};

const AdminProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [form, setForm] = useState<any>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===== COLORS =====
  const handleColorChange = (index: number, field: string, value: string) => {
    const newColors = [...form.colors];
    newColors[index][field] = value;
    setForm({ ...form, colors: newColors });
  };

  const addColorField = () => {
    setForm({ ...form, colors: [...form.colors, { name: '', image: '' }] });
  };

  const removeColorField = (index: number) => {
    if (form.colors.length === 1) return;
    setForm({ ...form, colors: form.colors.filter((_: any, i: number) => i !== index) });
  };

  // ===== IMAGES =====
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const removeImageField = (index: number) => {
    if (form.images.length === 1) return;
    setForm({ ...form, images: form.images.filter((_: any, i: number) => i !== index) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      colors: form.colors.filter((c: any) => c.name && c.image),
      sizes: form.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
      stock: Number(form.stock) || 0,
      images: form.images.filter((img: string) => img.trim() !== ''),
    };

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, payload);
        setMessage('✅ Product updated successfully!');
      } else {
        await API.post('/products', payload);
        setMessage('✅ Product added successfully!');
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (error: any) {
      setMessage(error.response?.data?.message || '❌ Something went wrong');
    }
  };

  const handleEdit = (product: IProduct) => {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      category: product.category,
      colors: product.colors.map((c) => ({ name: c.name, image: c.image })),
      sizes: product.sizes.join(', '),
      stock: String(product.stock),
      images: product.images.length > 0 ? product.images : [''],
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
      setMessage('🗑️ Product deleted successfully');
    } catch (error) {
      setMessage('❌ Delete failed');
    }
  };

  return (
    <div className="text-purple-dark">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2
          className="text-2xl font-bold text-purple-dark"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Products ({products.length})
        </h2>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditingId(null);
            setShowForm(!showForm);
          }}
          className="bg-purple text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-purple-dark transition"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {message && (
        <p className="mb-4 p-3 bg-white/80 rounded-xl text-sm text-purple-dark border border-pistachio">
          {message}
        </p>
      )}

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pistachio mb-8 space-y-4"
        >
          <h3 className="text-xl font-bold text-purple-dark mb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
            />
            <input
              type="number"
              placeholder="Price (Rs.)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
            />
          </div>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark"
            >
              <option>Handmade Thread Work</option>
              <option>Tie N Dye</option>
              <option>Metallic Thread Work</option>
            </select>
            <input
              type="text"
              placeholder="Sizes (S, M, L, XL)"
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              required
              className="px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
            />
          </div>

          {/* Colors */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-purple-dark">
                Colors (image for each color)
              </label>
              <button
                type="button"
                onClick={addColorField}
                className="text-purple text-sm font-semibold hover:underline"
              >
                + Add Color
              </button>
            </div>
            {form.colors.map((color: any, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Color name"
                  value={color.name}
                  onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                  required
                  className="flex-1 px-4 py-2 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-sm text-purple-dark placeholder-purple-dark/40"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={color.image}
                  onChange={(e) => handleColorChange(index, 'image', e.target.value)}
                  required
                  className="flex-[2] px-4 py-2 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-sm text-purple-dark placeholder-purple-dark/40"
                />
                <button
                  type="button"
                  onClick={() => removeColorField(index)}
                  className="text-purple-dark/40 hover:text-purple text-xl px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Images */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-purple-dark">
                Gallery Images
              </label>
              <button
                type="button"
                onClick={addImageField}
                className="text-purple text-sm font-semibold hover:underline"
              >
                + Add Image
              </button>
            </div>
            {form.images.map((img: string, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-sm text-purple-dark placeholder-purple-dark/40"
                />
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="text-purple-dark/40 hover:text-purple text-xl px-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-purple text-white py-3 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-purple-dark transition"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      )}

      {/* Products List */}
      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-pistachio flex items-center gap-4"
          >
            <img
              src={product.colors[0]?.image || product.images[0]}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-purple-dark">{product.name}</h3>
              <p className="text-sm text-purple-dark/60">
                {product.category} | Rs. {product.price.toLocaleString()}
              </p>
              <p className="text-xs text-purple-dark/40">
                {product.images?.length || 0} images
              </p>
            </div>
            <button
              onClick={() => handleEdit(product)}
              className="px-4 py-2 bg-purple/10 text-purple rounded-full text-sm hover:bg-purple/20 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(product._id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;