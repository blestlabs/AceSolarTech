'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search } from 'lucide-react';
import { useLocale, useTranslations } from '@/lib/i18n';
import type { BlogMeta } from '@/lib/blog';

export default function BlogListContent({ posts }: { posts: BlogMeta[] }) {
  const locale = useLocale();
  const t = useTranslations();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = posts.filter((post) => {
    const title = locale === 'mr' && post.titleMr ? post.titleMr : post.title;
    const desc = locale === 'mr' && post.descriptionMr ? post.descriptionMr : post.description;
    const matchSearch =
      !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase());
    const matchTag = !selectedTag || post.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-center mb-2"
      >
        {locale === 'mr' ? 'सोलर एनर्जी ब्लॉग' : 'Solar Energy Blog'}
      </motion.h1>
      <p className="text-center text-gray-600 mb-8">
        {locale === 'mr'
          ? 'सोलर पॅनेल, सरकारी योजना, आणि ऊर्जा बचत बद्दल मार्गदर्शक'
          : 'Expert guides on solar panels, subsidies, and energy savings'}
      </p>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={locale === 'mr' ? 'ब्लॉग शोधा...' : 'Search blogs...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !selectedTag ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-pressed={!selectedTag}
          >
            {locale === 'mr' ? 'सर्व' : 'All'}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-pressed={selectedTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          {locale === 'mr' ? 'कोणतेही ब्लॉग सापडले नाहीत.' : 'No blogs found.'}
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9] bg-gray-50">
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary-light text-primary rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-bold text-lg leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {locale === 'mr' && post.titleMr ? post.titleMr : post.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {locale === 'mr' && post.descriptionMr ? post.descriptionMr : post.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString(locale === 'mr' ? 'mr-IN' : 'en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
