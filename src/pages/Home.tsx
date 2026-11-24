import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Handmade Thread Work',
    image: 'https://i.pinimg.com/736x/ce/b6/da/ceb6da5526d909f17b0c09e73e99714f.jpg',
  },
  {
    name: 'Tie N Dye',
    image: 'https://i.pinimg.com/736x/71/94/82/7194820a979947b3d8c7279ffda9111c.jpg',
  },
  {
    name: 'Metallic Thread Work',
    image: 'https://i.pinimg.com/736x/cf/87/47/cf87479fc0d07f1219b9cc2aba2978f6.jpg',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-cream-dark to-cream">
        <h1
          className="absolute text-[15vw] md:text-[18vw] font-bold text-purple-dark/5 tracking-wider select-none pointer-events-none"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          PureWear
        </h1>

        <div className="absolute bottom-0 right-0 z-10 h-[95vh] w-full flex items-end justify-end pr-[5%] pointer-events-none">
          <img
            src="https://res.cloudinary.com/ags6osbg/image/upload/f_auto,q_auto/Firefly_7"
            alt="PureWear Model"
            className="h-full w-auto object-contain drop-shadow-2xl scale-125"
          />
        </div>

        <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 z-20 max-w-xs">
          <h2
            className="text-5xl md:text-6xl font-bold text-purple-dark leading-tight mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            PureWear
          </h2>
          <p className="text-purple text-sm tracking-[0.3em] uppercase mb-6">
            Handmade Elegance
          </p>
          <p className="text-purple-dark/60 text-sm leading-relaxed mb-6">
            Premium handmade designer clothing. Har piece mein mehnat, har dhaage mein kahani.
          </p>
          <Link
            to="/products"
            className="inline-block bg-purple text-white px-8 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-purple-dark transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>

        <div className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 text-right">
          <p className="text-6xl md:text-8xl font-bold text-purple-dark/10" style={{ fontFamily: 'Georgia, serif' }}>
            01
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-purple-dark/40 animate-bounce">
          ↓
        </div>
      </section>
      {/* Categories Section — 3 Bade Cards (Chhote Size) */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-purple text-sm tracking-[0.3em] uppercase mb-3">
              Our Collections
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-purple-dark"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Categories
            </h2>
            <div className="w-24 h-px bg-purple mx-auto mt-6" />
          </div>

          {/* 3 Cards — Chhote Size */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-[65vh] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 via-purple-dark/20 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-2xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {cat.name}
                  </h3>
                  <span className="inline-block text-white/80 text-xs font-semibold tracking-[0.2em] uppercase group-hover:translate-x-2 transition-transform duration-300">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;