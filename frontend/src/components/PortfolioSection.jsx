import React, { useState } from 'react';
import { projects, categories } from '../data/mock';
import ProjectModal from './ProjectModal';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-4xl md:text-5xl font-black text-foreground uppercase mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Portfólio
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Conheça nossos projetos de identidade visual e marketing
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - Visual Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative overflow-hidden rounded-lg aspect-[4/3] bg-secondary"
            >
              {/* Project Image */}
              <img
                src={project.thumbnail}
                alt={project.client}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-primary text-xs font-medium uppercase tracking-wider mb-1">
                  {project.category}
                </span>
                <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {project.client}
                </h3>
              </div>

              {/* Always visible title at bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 group-hover:opacity-0 transition-opacity">
                <h3 className="text-white text-lg font-semibold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {project.client}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum projeto encontrado.</p>
          </div>
        )}
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
