import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const HeroSection = () => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen bg-[#1a1c1b] relative overflow-hidden flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c1b] via-[#1a1c1b] to-[#3f4816]/20" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#d9fb06]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#3f4816]/30 rounded-full blur-2xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#d9fb06 1px, transparent 1px), linear-gradient(90deg, #d9fb06 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#302f2c] px-4 py-2 rounded-full">
              <Sparkles size={16} className="text-[#d9fb06]" />
              <span className="text-[#888680] text-sm font-medium uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Estúdio Criativo
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Portfólio de
              <span className="block text-[#d9fb06] mt-2">Design &</span>
              <span className="block mt-2">Branding</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl text-[#888680] max-w-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Criamos identidades visuais que conectam marcas e pessoas. 
              Transformamos ideias em experiências memoráveis.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {['Branding', 'Identidade Visual', 'Direção de Arte', 'Design Gráfico'].map((tag) => (
                <span 
                  key={tag}
                  className="text-sm text-[#d9fb06] border border-[#3f4816] px-4 py-2 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                onClick={scrollToPortfolio}
                className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[#d9fb06]/90 rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wide transition-transform hover:scale-105"
              >
                Ver Projetos por Cliente
              </Button>
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-[#d9fb06] text-[#d9fb06] hover:bg-[#d9fb06] hover:text-[#1a1c1b] rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wide transition-all"
              >
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square">
              {/* Rotating Border */}
              <div className="absolute inset-0 border-2 border-[#3f4816] rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 border-2 border-[#d9fb06]/30 rounded-3xl transform -rotate-3" />
              
              {/* Main Image Container */}
              <div className="absolute inset-4 bg-[#302f2c] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop"
                  alt="Design Studio"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/80 via-transparent to-transparent" />
                
                {/* Floating Stats */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-[#1a1c1b]/90 backdrop-blur-sm rounded-xl p-4 border border-[#3f4816]">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[#d9fb06] text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>50+</p>
                        <p className="text-[#888680] text-sm">Projetos</p>
                      </div>
                      <div className="w-px h-12 bg-[#3f4816]" />
                      <div>
                        <p className="text-[#d9fb06] text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>30+</p>
                        <p className="text-[#888680] text-sm">Clientes</p>
                      </div>
                      <div className="w-px h-12 bg-[#3f4816]" />
                      <div>
                        <p className="text-[#d9fb06] text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>10</p>
                        <p className="text-[#888680] text-sm">Anos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={scrollToPortfolio}
            className="text-[#d9fb06] hover:text-white transition-colors"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
