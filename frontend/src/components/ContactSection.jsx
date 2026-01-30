import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { contactData, logoUrl } from '../data/mock';
import { toast } from '../hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = `🟣 *NOVO CONTATO - NEXUS MARKETING*

👤 *Nome:* ${formData.name}
📧 *Email:* ${formData.email}
🏢 *Empresa:* ${formData.company || 'Não informado'}

💬 *Mensagem:*
${formData.message}`;

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Abrir WhatsApp com a mensagem
    const whatsappUrl = `https://wa.me/5511976966827?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para WhatsApp!",
      description: "Complete o envio da mensagem no WhatsApp.",
    });
    
    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: contactData.email, href: `mailto:${contactData.email}` },
    { icon: Phone, label: 'Telefone', value: contactData.phone, href: `tel:${contactData.phone.replace(/\D/g, '')}` },
    { icon: MapPin, label: 'Localização', value: 'São Paulo, Brasil', href: '#' },
  ];

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: `https://www.instagram.com/_marketingnexus?igsh=MWQwbHhpczY1bXh5Zw%3D%3D${contactData.instagram.replace('@', '')}` },
    //{ icon: Linkedin, label: 'LinkedIn', href: `https://linkedin.com/company/${contactData.linkedin}` },
    { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${contactData.whatsapp}` },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute right-0 bottom-0 w-1/2 h-96 bg-primary/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-primary" />
            <span 
              className="text-primary text-sm font-medium uppercase tracking-widest"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contato
            </span>
            <div className="w-12 h-px bg-primary" />
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Pronto para <span className="text-primary">transformar</span>
            <br />sua marca?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={logoUrl}
                alt="Nexus Marketing"
                className="w-16 h-16 object-contain rounded-full"
              />
              <div>
                <h3 
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Nexus Marketing
                </h3>
                <p className="text-muted-foreground">Transformando marcas em resultados</p>
              </div>
            </div>

            <p 
              className="text-lg text-muted-foreground leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Vamos conversar sobre seu próximo projeto. Entre em contato 
              e transforme sua visão em uma marca memorável.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-4 bg-secondary p-5 rounded-xl border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <info.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <p 
                      className="text-muted-foreground text-sm uppercase tracking-wide"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {info.label}
                    </p>
                    <p 
                      className="text-foreground font-medium"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p 
                className="text-muted-foreground text-sm uppercase tracking-wide mb-4"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Siga-nos
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-secondary p-8 rounded-2xl border border-border">
            <h3 
              className="text-2xl font-bold text-foreground mb-6 uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Solicitar Orçamento
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  className="text-muted-foreground text-sm uppercase tracking-wide mb-2 block"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Nome
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary rounded-xl py-6"
                />
              </div>

              <div>
                <label 
                  className="text-muted-foreground text-sm uppercase tracking-wide mb-2 block"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary rounded-xl py-6"
                />
              </div>

              <div>
                <label 
                  className="text-muted-foreground text-sm uppercase tracking-wide mb-2 block"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Empresa
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary rounded-xl py-6"
                />
              </div>

              <div>
                <label 
                  className="text-muted-foreground text-sm uppercase tracking-wide mb-2 block"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Mensagem
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Conte-nos sobre seu projeto..."
                  required
                  rows={4}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 font-semibold uppercase tracking-wide disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={18} />
                    Enviar Mensagem
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
