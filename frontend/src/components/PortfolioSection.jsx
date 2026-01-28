import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { projects, categories } from '../data/mock';
import ProjectModal from './ProjectModal';

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground uppercase mb-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Portfólio
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Conheça nossos projetos de identidade visual e marketing
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - Cards with Logo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={project.thumbnail}
                  alt={project.client}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Content with Logo */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Logo */}
                  {project.logo ? (
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-border overflow-hidden flex items-center justify-center p-1">
                      <img
                        src={project.logo}
                        alt={`Logo ${project.client}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border border-border flex items-center justify-center">
                      <span className="text-primary font-bold text-lg">
                        {project.client.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {project.client}
                    </h3>
                    <p 
                      className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mt-1"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">{project.year}</span>
                  <span className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                    Ver projeto <ArrowRight size={14} />
                  </span>
                </div>
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
