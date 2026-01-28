import React, { useState } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { projects, categories } from '../data/mock';
import ProjectModal from './ProjectModal';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-[#1a1c1b] relative">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 w-1/2 h-96 bg-[#3f4816]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-[#d9fb06]" />
            <span 
              className="text-[#d9fb06] text-sm font-medium uppercase tracking-widest"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Portfólio
            </span>
            <div className="w-12 h-px bg-[#d9fb06]" />
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Projetos por <span className="text-[#d9fb06]">Cliente</span>
          </h2>
          
          <p 
            className="text-[#888680] text-lg mt-6 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Conheça alguns dos projetos de identidade visual que desenvolvemos. 
            Cada trabalho é construído em parceria com nossos clientes.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-4">
            <Filter size={18} className="text-[#888680]" />
            <span 
              className="text-[#888680] text-sm uppercase tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Filtrar:
            </span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-all ${
                activeCategory === category
                  ? 'bg-[#d9fb06] text-[#1a1c1b]'
                  : 'bg-[#302f2c] text-[#888680] hover:text-white border border-[#3f4816] hover:border-[#d9fb06]/50'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer ${
                index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="relative overflow-hidden rounded-xl bg-[#302f2c] border border-[#3f4816] hover:border-[#d9fb06]/50 transition-all duration-500">
                {/* Image */}
                <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <img
                    src={project.thumbnail}
                    alt={project.client}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b] via-[#1a1c1b]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="bg-[#1a1c1b]/80 backdrop-blur-sm text-[#d9fb06] px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#d9fb06] flex items-center justify-center transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                    <ArrowUpRight size={20} className="text-[#1a1c1b]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 
                        className="text-xl font-bold text-white group-hover:text-[#d9fb06] transition-colors mb-2"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {project.client}
                      </h3>
                      <p 
                        className="text-[#888680] text-sm line-clamp-2"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {project.description}
                      </p>
                    </div>
                    <span 
                      className="text-[#d9fb06] text-sm font-medium shrink-0"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {project.year}
                    </span>
                  </div>

                  {/* Services Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.services.slice(0, 3).map((service, idx) => (
                      <span 
                        key={idx}
                        className="text-xs text-[#888680] bg-[#1a1c1b] px-2 py-1 rounded"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default PortfolioSection;
