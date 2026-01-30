import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { logoUrl } from '../data/mock';

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
      className="min-h-screen bg-background relative overflow-hidden flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(262, 100%, 65%) 1px, transparent 1px), linear-gradient(90deg, hsl(262, 100%, 65%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <Sparkles size={16} className="text-primary" />
              <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Agência Criativa
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Portfólio de
              <span className="block text-primary mt-2">Marketing &</span>
              <span className="block mt-2">Design</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Criamos estratégias de marketing e identidades visuais que conectam marcas e pessoas. 
              Transformamos ideias em resultados memoráveis.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {['Marketing Digital', 'Branding', 'Social Media', 'Design Gráfico'].map((tag) => (
                <span 
                  key={tag}
                  className="text-sm text-primary border border-primary/30 px-4 py-2 rounded-full hover:bg-primary/10 transition-colors"
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
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wide transition-transform hover:scale-105"
              >
                Ver Projetos
              </Button>
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 text-base font-semibold uppercase tracking-wide transition-all"
              >
                Fale Conosco
              </Button>
            </div>
          </div>

          {/* Right Content - Logo Display */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Rotating Border */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 border-2 border-primary/10 rounded-3xl transform -rotate-3" />
              
              {/* Main Logo Container */}
              <div className="absolute inset-4 bg-card rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl shadow-primary/20">
                <img 
                  src={logoUrl}
                  alt="Nexus Marketing"
                  className="w-3/4 h-3/4 object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 left-0 right-0 mx-4">
                <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <p className="text-primary text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>50+</p>
                      <p className="text-muted-foreground text-xs">Projetos</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <p className="text-primary text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>30+</p>
                      <p className="text-muted-foreground text-xs">Clientes</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <p className="text-primary text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>2+</p>
                      <p className="text-muted-foreground text-xs">Anos</p>
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
            className="text-primary hover:text-foreground transition-colors"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
