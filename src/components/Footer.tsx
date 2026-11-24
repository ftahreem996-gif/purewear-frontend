const Footer = () => {
  return (
    <footer className="bg-cream-dark border-t border-pistachio py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3
            className="text-3xl font-bold text-purple mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            PureWear
          </h3>
          <p className="text-purple-dark/60 text-sm leading-relaxed">
            Premium handmade designer clothing. Har piece mein mehnat, har dhaage mein kahani.
          </p>
        </div>

        <div>
          <h4 className="text-purple-dark font-semibold mb-4 tracking-wider uppercase text-sm">
            Quick Links
          </h4>
          <ul className="space-y-3 text-purple-dark/60 text-sm">
            <li className="hover:text-purple cursor-pointer transition">Home</li>
            <li className="hover:text-purple cursor-pointer transition">Products</li>
            <li className="hover:text-purple cursor-pointer transition">About Us</li>
            <li className="hover:text-purple cursor-pointer transition">Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-purple-dark font-semibold mb-4 tracking-wider uppercase text-sm">
            Contact
          </h4>
          <ul className="space-y-3 text-purple-dark/60 text-sm">
            <li>📧 info@purewear.com</li>
            <li>📱 +92 300 1234567</li>
            <li>📍 Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-pistachio text-center text-purple-dark/40 text-sm">
        © 2025 PureWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;