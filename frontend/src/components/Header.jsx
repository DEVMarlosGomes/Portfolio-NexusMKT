import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1a1c1b]/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="text-[#d9fb06] font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            STUDIO<span className="text-white">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'Sobre', id: 'about' },
              { name: 'Portfólio', id: 'portfolio' },
              { name: 'Contato', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-[#d9fb06] transition-colors text-sm font-medium tracking-wide uppercase"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection('portfolio')}
              className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[#d9fb06]/90 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide"
            >
              Ver Portfólio
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#d9fb06] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-[#3f4816] pt-6">
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Sobre', id: 'about' },
                { name: 'Portfólio', id: 'portfolio' },
                { name: 'Contato', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white hover:text-[#d9fb06] transition-colors text-base font-medium tracking-wide uppercase text-left"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[#d9fb06]/90 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide w-full mt-4"
              >
                Ver Portfólio
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
