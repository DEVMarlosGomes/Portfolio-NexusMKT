import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Instagram, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { contactData } from '../data/mock';
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
    
    // Simulate form submission (mock)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
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
    { icon: Instagram, label: 'Instagram', href: `https://instagram.com/${contactData.instagram.replace('@', '')}` },
    { icon: Linkedin, label: 'LinkedIn', href: `https://linkedin.com/company/${contactData.linkedin}` },
    { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${contactData.whatsapp}` },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#302f2c] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d9fb06]/30 to-transparent" />
      <div className="absolute right-0 bottom-0 w-1/2 h-96 bg-[#d9fb06]/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-px bg-[#d9fb06]" />
            <span 
              className="text-[#d9fb06] text-sm font-medium uppercase tracking-widest"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Contato
            </span>
            <div className="w-12 h-px bg-[#d9fb06]" />
          </div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase leading-tight"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Pronto para <span className="text-[#d9fb06]">transformar</span>
            <br />sua marca?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <p 
              className="text-lg text-[#888680] leading-relaxed"
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
                  className="flex items-center gap-4 bg-[#1a1c1b] p-5 rounded-xl border border-[#3f4816] hover:border-[#d9fb06]/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#3f4816]/50 flex items-center justify-center group-hover:bg-[#d9fb06]/20 transition-colors">
                    <info.icon size={22} className="text-[#d9fb06]" />
                  </div>
                  <div>
                    <p 
                      className="text-[#888680] text-sm uppercase tracking-wide"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {info.label}
                    </p>
                    <p 
                      className="text-white font-medium"
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
                className="text-[#888680] text-sm uppercase tracking-wide mb-4"
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
                    className="w-12 h-12 rounded-full bg-[#1a1c1b] border border-[#3f4816] flex items-center justify-center text-[#888680] hover:text-[#d9fb06] hover:border-[#d9fb06] transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-[#1a1c1b] p-8 rounded-2xl border border-[#3f4816]">
            <h3 
              className="text-2xl font-bold text-white mb-6 uppercase"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Solicitar Orçamento
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  className="text-[#888680] text-sm uppercase tracking-wide mb-2 block"
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
                  className="bg-[#302f2c] border-[#3f4816] text-white placeholder:text-[#888680]/50 focus:border-[#d9fb06] rounded-xl py-6"
                />
              </div>

              <div>
                <label 
                  className="text-[#888680] text-sm uppercase tracking-wide mb-2 block"
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
                  className="bg-[#302f2c] border-[#3f4816] text-white placeholder:text-[#888680]/50 focus:border-[#d9fb06] rounded-xl py-6"
                />
              </div>

              <div>
                <label 
                  className="text-[#888680] text-sm uppercase tracking-wide mb-2 block"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Empresa
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nome da sua empresa"
                  className="bg-[#302f2c] border-[#3f4816] text-white placeholder:text-[#888680]/50 focus:border-[#d9fb06] rounded-xl py-6"
                />
              </div>

              <div>
                <label 
                  className="text-[#888680] text-sm uppercase tracking-wide mb-2 block"
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
                  className="bg-[#302f2c] border-[#3f4816] text-white placeholder:text-[#888680]/50 focus:border-[#d9fb06] rounded-xl resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d9fb06] text-[#1a1c1b] hover:bg-[#d9fb06]/90 rounded-full py-6 font-semibold uppercase tracking-wide disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-[#1a1c1b] border-t-transparent rounded-full animate-spin" />
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
