import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);

  private defaultImage = 'https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg';
  private siteName = 'Hare Krishna Sloka';
  private baseUrl = 'https://askharekrishna.com'; // TODO: Replace with your actual domain

  constructor() {
    // Update meta tags on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCanonicalUrl();
    });
  }

  updateSEO(seoData: SEOData): void {
    // Update title
    const fullTitle = `${seoData.title} | ${this.siteName}`;
    this.titleService.setTitle(fullTitle);

    // Update meta description
    this.metaService.updateTag({ name: 'description', content: seoData.description });

    // Update keywords
    if (seoData.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: seoData.keywords });
    }

    // Update author
    if (seoData.author) {
      this.metaService.updateTag({ name: 'author', content: seoData.author });
    }

    // Update Open Graph tags for social media
    const imageUrl = seoData.image || this.defaultImage;
    const url = seoData.url || `${this.baseUrl}${this.router.url}`;
    const type = seoData.type || 'website';

    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: seoData.description });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: type });
    this.metaService.updateTag({ property: 'og:site_name', content: this.siteName });

    // Update Twitter Card tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: seoData.description });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });

    // Update canonical URL
    this.updateCanonicalUrl(url);
  }

  private updateCanonicalUrl(url?: string): void {
    const canonicalUrl = url || `${this.baseUrl}${this.router.url}`;
    
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);
    document.head.appendChild(link);
  }

  // Method to add structured data (JSON-LD)
  addStructuredData(data: any): void {
    let script = document.querySelector('script[type="application/ld+json"]');
    
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(data);
  }

  // Add breadcrumb structured data
  addBreadcrumb(breadcrumbs: Array<{ name: string; url: string }>): void {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `${this.baseUrl}${crumb.url}`
      }))
    };

    this.addStructuredData(breadcrumbData);
  }

  // Remove structured data
  removeStructuredData(): void {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (script) {
      script.remove();
    }
  }
}
