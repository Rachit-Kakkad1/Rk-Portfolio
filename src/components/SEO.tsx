import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  articlePublishedTime?: string;
  articleAuthor?: string[];
}

const NAME = 'Rachit Kakkad';
const ROLE = 'AI/ML Developer';
const SITE_URL = 'https://rachit-hk-portfolio.vercel.app';
const DEFAULT_IMAGE = '/og-image.png';

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  home: `${NAME} is an ${ROLE} building scalable intelligent systems and modern web applications. Explore projects, experience, and contact details.`,
  projects: `Explore ${NAME}'s complete portfolio of AI systems, web applications, and innovative projects. View case studies and source code.`,
  experience: `View ${NAME}'s professional experience as an ${ROLE}. Learn about roles at leading tech companies and freelance projects.`,
  contact: `Get in touch with ${NAME}, an ${ROLE}. Available for freelance projects, collaborations, and full-time opportunities.`,
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  articlePublishedTime,
  articleAuthor,
}) => {
  const location = useLocation();
  
  const currentPath = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');
  const defaultDescription = DEFAULT_DESCRIPTIONS[currentPath] || DEFAULT_DESCRIPTIONS.home;
  
  const pageTitle = title || (
    currentPath === 'home' 
      ? NAME 
      : currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
  );
  const seoTitle = currentPath === 'home' 
    ? `${NAME} | ${ROLE} Portfolio`
    : `${pageTitle} | ${NAME}`;
  const seoDescription = description || defaultDescription;
  
  const defaultKeywords = `${NAME}, ${ROLE}, Portfolio, AI Engineer, ML Engineer, React, Node.js, Python`;
  const seoKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  
  const seoImage = `${SITE_URL}${image || DEFAULT_IMAGE}`;
  const canonicalUrl = url 
    ? url 
    : typeof window !== 'undefined' 
      ? `${window.location.origin}${location.pathname}`
      : `${SITE_URL}${location.pathname}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "url": SITE_URL,
        "name": `${NAME} Portfolio`,
        "alternateName": `${NAME} Portfolio`,
      },
      {
        "@type": "Person",
        "name": NAME,
        "url": SITE_URL,
        "jobTitle": ROLE,
        "image": seoImage,
        "sameAs": [
          "https://github.com/Rachit-Kakkad1",
          "https://www.linkedin.com/in/rachit-kakkad-r29052007k",
          "https://www.youtube.com/@RachitKakkad"
        ],
      },
    ],
  };

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={NAME} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={`${NAME} Portfolio`} />

      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleAuthor && articleAuthor.map((author, i) => (
        <meta key={i} property="article:author" content={author} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@RachitKakkad" />
      <meta name="twitter:creator" content="@RachitKakkad" />

      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
