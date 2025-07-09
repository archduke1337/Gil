// Central SEO configuration for the website

export const SEO_CONFIG = {
  siteName: 'GIL - Gemological Institute Laboratories',
  siteUrl: 'https://gilab.info',
  defaultTitle: 'Professional Diamond Certificate Verification & Gemological Services',
  titleTemplate: '%s | GIL - Gemological Institute Laboratories',
  defaultDescription: 'GIL offers expert diamond certification, gemstone grading, and instant certificate verification. Industry-leading accuracy with advanced 3D analysis technology.',
  defaultKeywords: [
    'diamond certificate verification',
    'gemological institute',
    'diamond grading',
    'gemstone certification',
    'GIL laboratory',
    'GIA standards',
    'diamond authentication',
    'gem analysis',
    'precious stone verification',
    'diamond report check',
    'certificate reference number',
    'GIA trained gemologist',
    'GIA testing methods'
  ],
  defaultImage: '/attached_assets/1000119055-removebg-preview.png',
  twitterHandle: '@GILGemology',
  socialLinks: {
    jewelors: 'https://jewelors.com'
  },
  organization: {
    name: 'Gemological Institute Laboratories',
    alternateName: 'GIL',
    description: 'Leading gemological institute providing professional diamond certification, grading, and verification services worldwide.',
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English']
    }
  }
};

// Page-specific SEO data
export const PAGE_SEO = {
  home: {
    title: 'Professional Diamond Certificate Verification & Gemological Services',
    description: 'GIL - Gemological Institute Laboratories offers expert diamond certification following GIA standards, gemstone grading, and instant certificate verification. Industry-leading accuracy with GIA-trained gemologists.',
    keywords: 'diamond certificate, gemological institute, GIL, GIA standards, diamond grading, gemstone certification, GIA trained gemologist'
  },
  verify: {
    title: 'Diamond Certificate Verification - Instant Authentication',
    description: 'Verify the authenticity of your GIL diamond certificate instantly. Enter your certificate reference number to access detailed grading information and ensure your gemstone\'s authenticity.',
    keywords: 'verify diamond certificate, GIL certificate check, diamond report verification, gemstone authentication'
  },
  encyclopedia: {
    title: 'Comprehensive Gem Encyclopedia - Diamond & Gemstone Guide',
    description: 'Explore our extensive gem encyclopedia featuring detailed information on diamonds, precious stones, and gemstones. Learn about characteristics, origins, grading, and identification.',
    keywords: 'gem encyclopedia, diamond guide, gemstone information, precious stones, gem characteristics'
  },
  analysis: {
    title: 'GIA Standard Diamond Analysis & Grading Services - Professional Gemological Testing',
    description: 'Professional gemological analysis following GIA standards using state-of-the-art equipment. Get accurate diamond grading reports from GIA-trained experts.',
    keywords: 'diamond analysis, GIA standards, gemstone grading, professional testing, GIL grading, diamond report, GIA trained gemologist'
  },
  services: {
    title: 'Advanced Gem Services - AI Analysis & Community Platform',
    description: 'Discover GIL\'s advanced gemological services including AI-powered recommendations, 3D visualization, community showcase, and professional gem analysis tools.',
    keywords: 'gem services, AI gem analysis, 3D diamond visualization, gemstone community, advanced testing'
  },
  faqs: {
    title: 'Frequently Asked Questions - Diamond Certification & Grading',
    description: 'Find answers to common questions about diamond certification, grading processes, certificate verification, and GIL\'s gemological services.',
    keywords: 'diamond certification FAQ, grading questions, GIL help, certificate verification guide'
  },
  about: {
    title: 'About GIL - Leading Gemological Institute Since 2024',
    description: 'Learn about Gemological Institute Laboratories (GIL), our mission, expertise, and commitment to providing accurate diamond certification and gemological services.',
    keywords: 'about GIL, gemological institute history, diamond certification experts, GIL mission'
  },
  privacy: {
    title: 'Privacy Policy - Data Protection & User Privacy',
    description: 'GIL\'s privacy policy outlines how we collect, use, and protect your personal information when using our diamond verification and gemological services.',
    keywords: 'privacy policy, data protection, GDPR compliance, user privacy, GIL policies'
  },
  terms: {
    title: 'Terms of Service - Website Usage & Legal Terms',
    description: 'Terms and conditions for using GIL\'s website, certificate verification services, and gemological resources. Read our legal terms and usage guidelines.',
    keywords: 'terms of service, legal terms, website usage, GIL policies, user agreement'
  }
};

// Schema.org structured data templates
export const SCHEMA_TEMPLATES = {
  gemstone: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.name,
    description: data.description,
    brand: {
      '@type': 'Organization',
      name: 'Gemological Institute Laboratories'
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '100'
    }
  }),
  
  service: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    provider: {
      '@type': 'Organization',
      name: 'Gemological Institute Laboratories'
    },
    serviceType: data.serviceType,
    description: data.description,
    areaServed: 'Worldwide'
  }),
  
  faq: (faqs: any[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  })
};