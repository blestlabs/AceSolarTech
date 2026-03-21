import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  imageAlt: string;
  readTime: string;
  content: string;
}

export interface BlogMeta {
  slug: string;
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  imageAlt: string;
  readTime: string;
}

const blogDir = path.join(process.cwd(), 'src/data/blog');

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function getAllBlogMeta(): BlogMeta[] {
  const slugs = getAllBlogSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(blogDir, `${slug}.md`);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || '',
        titleMr: data.titleMr || '',
        description: data.description || '',
        descriptionMr: data.descriptionMr || '',
        date: data.date || '',
        author: data.author || 'AceSolarTech',
        tags: data.tags || [],
        image: data.image || '/images/og-image.png',
        imageAlt: data.imageAlt || '',
        readTime: data.readTime || '5 min',
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content: md } = matter(raw);

  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(md);

  return {
    slug,
    title: data.title || '',
    titleMr: data.titleMr || '',
    description: data.description || '',
    descriptionMr: data.descriptionMr || '',
    date: data.date || '',
    author: data.author || 'AceSolarTech',
    tags: data.tags || [],
    image: data.image || '/images/og-image.png',
    imageAlt: data.imageAlt || '',
    readTime: data.readTime || '5 min',
    content: result.toString(),
  };
}
