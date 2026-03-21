'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import type { BlogPost } from '@/lib/blog';

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const locale = useLocale();

  const title = locale === 'mr' && post.titleMr ? post.titleMr : post.title;
  const description =
    locale === 'mr' && post.descriptionMr ? post.descriptionMr : post.description;

  const handleShare = async () => {
    const url = `https://acesolartech.com/blog/${post.slug}`;
    if (navigator.share) {
      await navigator.share({ title, text: description, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {locale === 'mr' ? 'सर्व ब्लॉग' : 'All Blogs'}
      </Link>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-6 bg-gray-50"
      >
        <Image
          src={post.image}
          alt={post.imageAlt || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </motion.div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-primary-light text-primary rounded-full"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-4xl font-bold leading-tight mb-3"
      >
        {title}
      </motion.h1>

      {/* Meta row */}
      <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {new Date(post.date).toLocaleDateString(locale === 'mr' ? 'mr-IN' : 'en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {post.readTime}
        </span>
        <span className="text-gray-400">|</span>
        <span>{post.author}</span>
        <button
          onClick={handleShare}
          className="ml-auto flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors"
          aria-label="Share this article"
        >
          <Share2 className="w-4 h-4" />
          {locale === 'mr' ? 'शेअर करा' : 'Share'}
        </button>
      </div>

      {/* Article body — content is from our own markdown files, safe to render */}
      <div
        className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-text
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-text
          prose-ul:list-disc prose-ol:list-decimal
          prose-li:text-gray-700
          prose-img:rounded-xl prose-img:shadow-md
          prose-table:w-full prose-table:border-collapse prose-table:text-sm
          prose-th:bg-gray-50 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-gray-200
          prose-td:p-3 prose-td:border prose-td:border-gray-200
          prose-blockquote:border-l-primary prose-blockquote:bg-primary-light/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-green-50 rounded-2xl border border-primary/10 text-center">
        <h3 className="text-xl font-bold mb-2">
          {locale === 'mr' ? 'सोलर बद्दल प्रश्न आहेत?' : 'Have questions about solar?'}
        </h3>
        <p className="text-gray-600 mb-4">
          {locale === 'mr'
            ? 'आमच्या तज्ञांशी WhatsApp वर बोला — मोफत सल्ला!'
            : 'Talk to our experts on WhatsApp — free consultation!'}
        </p>
        <a
          href="https://wa.me/917264075144?text=Hi!%20I%20read%20your%20blog%20and%20have%20questions%20about%20solar."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1da851] transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {locale === 'mr' ? 'WhatsApp वर बोला' : 'Chat on WhatsApp'}
        </a>
      </div>
    </article>
  );
}
