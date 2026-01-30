import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const ProjectModal = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, [project.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project.images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose, nextImage, prevImage]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-5xl bg-card sm:rounded-2xl overflow-hidden transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="h-full sm:max-h-[95vh] overflow-y-auto">
          
          {/* Header with Logo - Mobile First */}
          <div className="sticky top-0 z-20 bg-card border-b border-border p-4 flex items-center gap-3 sm:hidden">
            {project.logo ? (
              <div className="w-10 h-10 rounded-full bg-white border border-border overflow-hidden flex items-center justify-center p-1">
                <img src={project.logo} alt={project.client} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">{project.client.charAt(0)}</span>
              </div>
            )}
            <div>
              <h2 className="font-bold text-foreground text-sm">{project.client}</h2>
              <span className="text-primary text-xs">{project.category}</span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="relative bg-white">
            {/* Main Image - Full Display */}
            <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] p-4 sm:p-6">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.client} - Imagem ${currentImageIndex + 1}`}
                className="max-w-full max-h-[60vh] sm:max-h-[50vh] md:max-h-[60vh] w-auto h-auto object-contain"
              />
              
              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-white text-sm font-medium">
                  {currentImageIndex + 1} / {project.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {project.images.length > 1 && (
              <div className="flex gap-2 p-3 sm:p-4 overflow-x-auto bg-secondary/50 border-t border-border">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all bg-white p-1 ${
                      index === currentImageIndex 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="p-4 sm:p-6 md:p-8 space-y-6">
            
            {/* Header - Desktop */}
            <div className="hidden sm:flex items-start gap-4">
              {project.logo ? (
                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-border overflow-hidden flex items-center justify-center p-2 shadow-sm">
                  <img src={project.logo} alt={project.client} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 border-2 border-border flex items-center justify-center">
                  <span className="text-primary font-bold text-2xl">{project.client.charAt(0)}</span>
                </div>
              )}
              <div>
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {project.category} • {project.year}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {project.client}
                </h2>
              </div>
            </div>

            {/* Description Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-5">
                {/* Visão Geral */}
                <div>
                  <h3 className="text-foreground font-semibold mb-2 uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Visão Geral
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Desafio */}
                <div>
                  <h3 className="text-foreground font-semibold mb-2 uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Desafio
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* Solução */}
                <div>
                  <h3 className="text-foreground font-semibold mb-2 uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Solução
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* Paleta de Cores */}
                <div>
                  <h3 className="text-foreground font-semibold mb-3 uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Paleta de Cores
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.colorPalette.map((color, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg"
                      >
                        <div 
                          className="w-6 h-6 rounded-full border border-border shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-xs">
                          <span className="text-foreground font-medium block">{color.name}</span>
                          <span className="text-muted-foreground">{color.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tipografia */}
                <div>
                  <h3 className="text-foreground font-semibold mb-2 uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Tipografia
                  </h3>
                  <p className="text-primary font-medium text-sm sm:text-base">
                    {project.typography}
                  </p>
                </div>

                {/* Serviços */}
                <div>
                  <h3 className="text-foreground font-semibold mb-3 uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Serviços
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map((service, index) => (
                      <span 
                        key={index}
                        className="text-sm text-primary border border-primary/30 bg-primary/5 px-3 py-1.5 rounded-full font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-border">
              <Button
                onClick={() => {
                  const whatsappMessage = `🟣 *INTERESSE EM PROJETO*

Olá! Vi o projeto *${project.client}* no portfólio e gostaria de saber mais sobre os serviços de ${project.category}.

Podem me ajudar?`;
                  const encodedMessage = encodeURIComponent(whatsappMessage);
                  window.open(`https://wa.me/5511976966827?text=${encodedMessage}`, '_blank');
                }}
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 px-8 font-semibold uppercase tracking-wide"
              >
                <ExternalLink size={18} className="mr-2" />
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
