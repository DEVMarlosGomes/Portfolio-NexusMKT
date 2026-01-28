import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../context/ThemeContext';
import { logoUrl } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md py-3 shadow-lg shadow-primary/5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={logoUrl} 
              alt="Nexus Marketing" 
              className="w-10 h-10 object-contain rounded-full"
            />
            <span 
              className="text-foreground font-bold text-xl tracking-tight"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              NEXUS<span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', id: 'home' },
              { name: 'Sobre', id: 'about' },
              { name: 'Portfólio', id: 'portfolio' },
              { name: 'Contato', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {item.name}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-all"
              aria-label={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <Button
              onClick={() => scrollToSection('portfolio')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-wide"
            >
              Ver Portfólio
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary text-foreground"
              aria-label={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-border pt-6">
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
                  className="text-foreground hover:text-primary transition-colors text-base font-medium tracking-wide uppercase text-left"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {item.name}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('portfolio')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide w-full mt-4"
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
