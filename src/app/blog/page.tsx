import type { Metadata } from 'next';
import { getAllBlogMeta } from '@/lib/blog';
import BlogListContent from '@/components/blog/BlogListContent';

export const metadata: Metadata = {
  title: 'Solar Energy Blog | AceSolarTech',
  description:
    'Expert guides on solar panels, government subsidies, net metering, and solar farming in Maharashtra. Learn how to save on electricity with AceSolarTech.',
  alternates: {
    canonical: 'https://acesolartech.com/blog',
  },
  openGraph: {
    title: 'Solar Energy Blog | AceSolarTech',
    description:
      'Expert guides on solar panels, government subsidies, net metering, and solar farming in Maharashtra.',
    images: [{ url: '/images/og-image.png', width: 1792, height: 1024 }],
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogMeta();

  return <BlogListContent posts={posts} />;
}
