import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/signup', { name, email, password });
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold text-purple-dark mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Join PureWear
          </h1>
          <p className="text-purple-dark/60">Create your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pistachio"
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-purple-dark mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-dark mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-purple-dark mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-pistachio bg-white focus:border-purple focus:outline-none text-purple-dark placeholder-purple-dark/40"
                placeholder="Min 6 characters"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-purple text-white py-4 rounded-full font-semibold tracking-wider uppercase text-sm hover:bg-purple-dark transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-center text-purple-dark/60 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;