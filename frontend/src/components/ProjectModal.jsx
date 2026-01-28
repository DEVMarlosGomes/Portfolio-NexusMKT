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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-card rounded-2xl border border-border shadow-2xl transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-5 gap-0">
          {/* Image Gallery - 3 columns */}
          <div className="lg:col-span-3 relative bg-secondary">
            {/* Main Image */}
            <div className="relative aspect-[16/10]">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.client} - Imagem ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary hover:bg-background transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary hover:bg-background transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-foreground text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {currentImageIndex + 1} / {project.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {project.images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details - 2 columns */}
          <div className="lg:col-span-2 p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[70vh] lg:max-h-none">
            {/* Header */}
            <div>
              <span 
                className="text-primary text-sm font-medium uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {project.category} • {project.year}
              </span>
              <h2 
                className="text-3xl font-bold text-foreground mt-2 uppercase"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {project.client}
              </h2>
            </div>

            {/* Description */}
            <div>
              <h3 
                className="text-foreground font-semibold mb-2 uppercase text-sm tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Visão Geral
              </h3>
              <p 
                className="text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {project.description}
              </p>
            </div>

            {/* Challenge */}
            <div>
              <h3 
                className="text-foreground font-semibold mb-2 uppercase text-sm tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Desafio
              </h3>
              <p 
                className="text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div>
              <h3 
                className="text-foreground font-semibold mb-2 uppercase text-sm tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Solução
              </h3>
              <p 
                className="text-muted-foreground leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {project.solution}
              </p>
            </div>

            {/* Color Palette */}
            <div>
              <h3 
                className="text-foreground font-semibold mb-3 uppercase text-sm tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Paleta de Cores
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.colorPalette.map((color, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg"
                  >
                    <div 
                      className="w-5 h-5 rounded-full border border-border"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span 
                      className="text-xs text-muted-foreground"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 
                className="text-foreground font-semibold mb-2 uppercase text-sm tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Tipografia
              </h3>
              <p 
                className="text-primary"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {project.typography}
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 
                className="text-foreground font-semibold mb-3 uppercase text-sm tracking-wide"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Serviços
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, index) => (
                  <span 
                    key={index}
                    className="text-sm text-primary border border-primary/30 px-3 py-1 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-border">
              <Button
                onClick={() => {
                  handleClose();
                  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 400);
                }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 font-semibold uppercase tracking-wide"
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
