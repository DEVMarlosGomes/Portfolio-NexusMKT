// Mock data for Portfolio - Will be replaced with backend API
// NEXUS MARKETING Portfolio

export const projects = [
  {
    id: 1,
    client: "Cliente 1",
    category: "Branding",
    year: "2025",
    description: "Identidade visual completa. Aguardando fotos do cliente para atualizar.",
    challenge: "Criar uma marca que transmita profissionalismo e modernidade.",
    solution: "Desenvolvemos uma identidade visual impactante e memorável.",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop"
    ],
    colorPalette: [
      { name: "Primária", hex: "#8A4FFF" },
      { name: "Secundária", hex: "#3A3242" },
      { name: "Acento", hex: "#C0C0C0" }
    ],
    typography: "A definir",
    services: ["Branding", "Logo Design", "Identidade Visual"]
  },
  {
    id: 2,
    client: "Cliente 2",
    category: "Identidade Visual",
    year: "2025",
    description: "Projeto de identidade visual. Aguardando fotos do cliente.",
    challenge: "Desenvolver uma marca única e diferenciada.",
    solution: "Criamos uma identidade que destaca os valores da marca.",
    thumbnail: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&h=800&fit=crop"
    ],
    colorPalette: [
      { name: "Primária", hex: "#8A4FFF" },
      { name: "Secundária", hex: "#3A3242" }
    ],
    typography: "A definir",
    services: ["Identidade Visual", "Manual de Marca"]
  },
  {
    id: 3,
    client: "Cliente 3",
    category: "Social Media",
    year: "2024",
    description: "Gestão de redes sociais e criação de conteúdo visual.",
    challenge: "Aumentar engajamento e presença digital.",
    solution: "Estratégia de conteúdo visual impactante.",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&h=800&fit=crop"
    ],
    colorPalette: [
      { name: "Primária", hex: "#8A4FFF" }
    ],
    typography: "A definir",
    services: ["Social Media", "Design Gráfico"]
  }
];

export const categories = ["Todos", "Branding", "Identidade Visual", "Social Media"];

export const aboutData = {
  name: "Nexus Marketing",
  role: "Marketing & Design",
  bio: "Somos uma agência criativa especializada em marketing digital, branding e identidades visuais que transformam ideias em marcas memoráveis. Com expertise em estratégias digitais, ajudamos empresas a conquistar uma presença autêntica e impactante no mercado.",
  stats: [
    { number: "50+", label: "Projetos Entregues" },
    { number: "30+", label: "Clientes Satisfeitos" },
    { number: "5+", label: "Anos de Experiência" }
  ],
  skills: ["Branding", "Marketing Digital", "Social Media", "Design Gráfico", "Identidade Visual"]
};

export const contactData = {
  email: "contato@nexusmarketing.com.br",
  phone: "(11) 99999-9999",
  whatsapp: "5511999999999",
  instagram: "@nexusmarketing",
  linkedin: "nexus-marketing"
};

// Logo URL
export const logoUrl = "https://customer-assets.emergentagent.com/job_creative-hub-451/artifacts/8uvfvzbm_image.png";
