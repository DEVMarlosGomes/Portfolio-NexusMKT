import React from 'react';
import { Palette, Eye, Lightbulb, Layers } from 'lucide-react';
import { aboutData, logoUrl } from '../data/mock';

const AboutSection = () => {
  const skills = [
    { icon: Palette, name: 'Branding', description: 'Identidades visuais únicas' },
    { icon: Eye, name: 'Marketing', description: 'Estratégias digitais' },
    { icon: Lightbulb, name: 'Estratégia', description: 'Posicionamento de marca' },
    { icon: Layers, name: 'Design', description: 'Peças gráficas premium' },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-background relative">
      {/* Background Accent */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 h-96 bg-primary/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Logo/Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-card border border-border flex items-center justify-center">
              <img 
                src={logoUrl}
                alt="Nexus Marketing"
                className="w-2/3 h-2/3 object-contain"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-card p-6 rounded-xl border border-border max-w-xs shadow-lg">
              <p className="text-primary text-4xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                5+
              </p>
              <p className="text-foreground text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Anos transformando marcas em resultados
              </p>
            </div>

            {/* Decorative Border */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-primary/20 rounded-2xl" />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2">
              <div className="w-12 h-px bg-primary" />
              <span 
                className="text-primary text-sm font-medium uppercase tracking-widest"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Sobre Nós
              </span>
            </div>

            {/* Heading */}
            <h2 
              className="text-4xl md:text-5xl font-black text-foreground leading-tight uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {aboutData.name}
            </h2>

            {/* Description */}
            <p 
              className="text-lg text-muted-foreground leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {aboutData.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-border">
              {aboutData.stats.map((stat, index) => (
                <div key={index}>
                  <p 
                    className="text-3xl md:text-4xl font-bold text-primary"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {stat.number}
                  </p>
                  <p 
                    className="text-muted-foreground text-sm mt-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index}
                  className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 transition-colors group"
                >
                  <skill.icon 
                    size={24} 
                    className="text-primary mb-3 group-hover:scale-110 transition-transform" 
                  />
                  <h3 
                    className="text-foreground font-semibold mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {skill.name}
                  </h3>
                  <p 
                    className="text-muted-foreground text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
