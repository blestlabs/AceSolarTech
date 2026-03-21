import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog';
import BlogPostContent from '@/components/blog/BlogPostContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | AceSolarTech Blog`,
    description: post.description,
    alternates: {
      canonical: `https://acesolartech.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `https://acesolartech.com${post.image}`,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://acesolartech.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AceSolarTech',
      url: 'https://acesolartech.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://acesolartech.com/images/logo-icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://acesolartech.com/blog/${slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <>
      <Script
        id={`article-jsonld-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(articleJsonLd)}
      </Script>
      <BlogPostContent post={post} />
    </>
  );
}
