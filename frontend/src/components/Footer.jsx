import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1c1b] py-12 relative">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3f4816] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="text-[#d9fb06] font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity inline-block mb-3"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              STUDIO<span className="text-white">.</span>
            </a>
            <p 
              className="text-[#888680] text-sm flex items-center justify-center md:justify-start gap-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              © {currentYear} Studio Creativo. Feito com 
              <Heart size={14} className="text-[#d9fb06] fill-current" /> 
              em São Paulo.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center gap-6">
            {['Home', 'Sobre', 'Portfólio', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                className="text-[#888680] hover:text-[#d9fb06] transition-colors text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-[#302f2c] border border-[#3f4816] flex items-center justify-center text-[#888680] hover:text-[#d9fb06] hover:border-[#d9fb06] transition-all"
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
