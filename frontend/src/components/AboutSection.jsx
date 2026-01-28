import React from 'react';
import { Palette, Eye, Lightbulb, Layers } from 'lucide-react';
import { aboutData } from '../data/mock';

const AboutSection = () => {
  const skills = [
    { icon: Palette, name: 'Branding', description: 'Identidades visuais únicas' },
    { icon: Eye, name: 'Direção de Arte', description: 'Conceitos visuais impactantes' },
    { icon: Lightbulb, name: 'Estratégia', description: 'Posicionamento de marca' },
    { icon: Layers, name: 'Design', description: 'Peças gráficas premium' },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#1a1c1b] relative">
      {/* Background Accent */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3 h-96 bg-[#3f4816]/10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=1000&fit=crop"
                alt="Creative Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b] via-transparent to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -right-8 bg-[#302f2c] p-6 rounded-xl border border-[#3f4816] max-w-xs">
              <p className="text-[#d9fb06] text-4xl font-bold mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                10+
              </p>
              <p className="text-white text-lg font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                Anos transformando marcas em experiências memoráveis
              </p>
            </div>

            {/* Decorative Border */}
            <div className="absolute -z-10 top-8 left-8 w-full h-full border-2 border-[#d9fb06]/20 rounded-2xl" />
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2">
              <div className="w-12 h-px bg-[#d9fb06]" />
              <span 
                className="text-[#d9fb06] text-sm font-medium uppercase tracking-widest"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Sobre Nós
              </span>
            </div>

            {/* Heading */}
            <h2 
              className="text-4xl md:text-5xl font-black text-white leading-tight uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {aboutData.name}
            </h2>

            {/* Description */}
            <p 
              className="text-lg text-[#888680] leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {aboutData.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-[#3f4816]">
              {aboutData.stats.map((stat, index) => (
                <div key={index}>
                  <p 
                    className="text-3xl md:text-4xl font-bold text-[#d9fb06]"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {stat.number}
                  </p>
                  <p 
                    className="text-[#888680] text-sm mt-1"
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
                  className="bg-[#302f2c] p-5 rounded-xl border border-[#3f4816] hover:border-[#d9fb06]/50 transition-colors group"
                >
                  <skill.icon 
                    size={24} 
                    className="text-[#d9fb06] mb-3 group-hover:scale-110 transition-transform" 
                  />
                  <h3 
                    className="text-white font-semibold mb-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {skill.name}
                  </h3>
                  <p 
                    className="text-[#888680] text-sm"
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
