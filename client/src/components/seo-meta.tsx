import { useEffect } from 'react';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

export function SEOMeta({
  title,
  description,
  keywords,
  image = '/attached_assets/1000119055-removebg-preview.png',
  url = 'https://gilab.info',
  type = 'website',
  author = 'Gemological Institute Laboratories',
  publishedTime,
  modifiedTime,
  section,
  tags,
  noindex = false,
}: SEOMetaProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | GIL - Gemological Institute Laboratories`;

    // Update meta tags
    const updateMetaTag = (selector: string, content: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        const [attr, value] = selector.replace('meta[', '').replace(']', '').split('=');
        element.setAttribute(attr, value.replace(/"/g, ''));
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Primary meta tags
    updateMetaTag('meta[name="title"]', `${title} | GIL`);
    updateMetaTag('meta[name="description"]', description);
    if (keywords) updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[name="author"]', author);
    
    // Robots meta tag
    updateMetaTag('meta[name="robots"]', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', title);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:url"]', url);
    updateMetaTag('meta[property="og:image"]', image.startsWith('http') ? image : `https://gilab.info${image}`);
    updateMetaTag('meta[property="og:site_name"]', 'Gemological Institute Laboratories');

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', title);
    updateMetaTag('meta[name="twitter:description"]', description);
    updateMetaTag('meta[name="twitter:image"]', image.startsWith('http') ? image : `https://gilab.info${image}`);

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) updateMetaTag('meta[property="article:published_time"]', publishedTime);
      if (modifiedTime) updateMetaTag('meta[property="article:modified_time"]', modifiedTime);
      if (section) updateMetaTag('meta[property="article:section"]', section);
      if (tags) {
        tags.forEach((tag, index) => {
          updateMetaTag(`meta[property="article:tag:${index}"]`, tag);
        });
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Cleanup function
    return () => {
      // Reset to default title on unmount
      document.title = 'GIL - Gemological Institute Laboratories | Professional Diamond & Gemstone Certification';
    };
  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags, noindex]);

  return null;
}

// Structured data component
interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Product' | 'FAQPage' | 'BreadcrumbList' | 'LocalBusiness';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [type, data]);

  return null;
}

// Breadcrumb component for better navigation and SEO
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function SEOBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://gilab.info${item.url}`,
    })),
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={item.url} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-700">{item.name}</span>
            ) : (
              <a href={item.url} className="hover:text-primary">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}