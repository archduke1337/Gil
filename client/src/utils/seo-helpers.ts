// SEO utility functions for generating optimized content

export function generateMetaDescription(content: string, maxLength = 160): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength - 3).trim() + '...';
}

export function generatePageTitle(title: string, siteName = 'GIL'): string {
  return `${title} | ${siteName}`;
}

export function generateKeywords(baseKeywords: string[], additionalKeywords: string[] = []): string {
  const allKeywords = [...new Set([...baseKeywords, ...additionalKeywords])];
  return allKeywords.join(', ');
}

// Generate FAQ structured data
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
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
  };
}

// Generate Product structured data for certificates
export function generateCertificateSchema(certificate: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Diamond Certificate ${certificate.referenceNumber}`,
    description: `${certificate.shape} diamond, ${certificate.carat} carat, ${certificate.colorGrade} color, ${certificate.clarityGrade} clarity`,
    brand: {
      '@type': 'Organization',
      name: 'Gemological Institute Laboratories'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '1'
    }
  };
}

// Generate internal linking suggestions
export function getRelatedPages(currentPage: string): { title: string; url: string }[] {
  const pages = {
    '/': [
      { title: 'Verify Certificate', url: '/verify' },
      { title: 'Gem Encyclopedia', url: '/gem-encyclopedia' },
      { title: 'Analysis & Grading', url: '/analysis-grading' }
    ],
    '/verify': [
      { title: 'How Grading Works', url: '/analysis-grading' },
      { title: 'Learn About Gems', url: '/gem-encyclopedia' },
      { title: 'Our Services', url: '/gem-services' }
    ],
    '/gem-encyclopedia': [
      { title: 'Get Your Gem Graded', url: '/analysis-grading' },
      { title: 'Verify Authenticity', url: '/verify' },
      { title: 'Advanced Services', url: '/gem-services' }
    ],
    '/analysis-grading': [
      { title: 'Verify Your Certificate', url: '/verify' },
      { title: 'Learn More About Gems', url: '/gem-encyclopedia' },
      { title: 'View All Services', url: '/gem-services' }
    ],
    '/analysis': [
      { title: 'Verify Your Certificate', url: '/verify' },
      { title: 'Learn More About Gems', url: '/gem-encyclopedia' },
      { title: 'View All Services', url: '/gem-services' }
    ],
    '/gem-services': [
      { title: 'Start Verification', url: '/verify' },
      { title: 'Grading Process', url: '/analysis' },
      { title: 'Gem Knowledge Base', url: '/gem-encyclopedia' }
    ]
  };

  return pages[currentPage] || [];
}

// Generate breadcrumb items
export function generateBreadcrumbs(path: string): { name: string; url: string }[] {
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  const pathMap: { [key: string]: string } = {
    '/verify': 'Certificate Verification',
    '/gem-encyclopedia': 'Gem Encyclopedia',
    '/analysis-grading': 'Analysis & Grading',
    '/analysis': 'Analysis & Grading',
    '/gem-services': 'Gem Services',
    '/faqs': 'FAQs',
    '/about': 'About Us',
    '/privacy-policy': 'Privacy Policy',
    '/terms-of-service': 'Terms of Service'
  };

  if (pathMap[path]) {
    breadcrumbs.push({ name: pathMap[path], url: path });
  }

  return breadcrumbs;
}