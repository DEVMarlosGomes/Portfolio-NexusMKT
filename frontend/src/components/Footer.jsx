import React from 'react';
import { ArrowUp, Car, Heart, Target } from 'lucide-react';
import { logoUrl } from '../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 relative">
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity inline-flex mb-3"
            >
              <img 
                src={logoUrl}
                alt="Nexus Marketing"
                className="w-8 h-8 object-contain rounded-full"
              />
              <span 
                className="text-foreground font-bold text-xl tracking-tight"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                NEXUS<span className="text-primary">.</span>
              </span>
            </a>
            <p 
              className="text-muted-foreground text-sm flex items-center justify-center md:justify-start gap-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              © {currentYear} Nexus Marketing. Feito com 
              <Target size={14} className="text-primary fill-current" /> 
              em São Paulo.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center gap-6">
            {['Home', 'Sobre', 'Portfólio', 'Contato'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
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
