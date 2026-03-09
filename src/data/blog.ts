import matter from 'gray-matter';
import { format, isValid } from 'date-fns';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  dateISO: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
  order?: number;
  draft?: boolean;
}

type Frontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  readTime?: string;
  image?: string;
  category?: string;
  tags?: string[] | string;
  order?: number;
  draft?: boolean;
};

const modules = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  as: 'raw',
}) as Record<string, string>;

const articles: Article[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;
    const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? '';
    const dateISO = fm.date ?? '';
    const dateObj = new Date(dateISO);
    const dateDisplay = isValid(dateObj) ? format(dateObj, 'yyyy年M月d日') : dateISO;
    const tags = Array.isArray(fm.tags)
      ? fm.tags
      : typeof fm.tags === 'string'
        ? fm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : [];

    return {
      id: slug,
      title: fm.title ?? slug,
      excerpt: fm.excerpt ?? '',
      content: content.trim(),
      date: dateDisplay,
      dateISO,
      readTime: fm.readTime ?? '',
      image: fm.image ?? '',
      category: fm.category ?? '',
      tags,
      order: typeof fm.order === 'number' ? fm.order : undefined,
      draft: fm.draft === true,
    };
  })
  .filter(article => !article.draft)
  .sort((a, b) => {
    const aHasOrder = typeof a.order === 'number';
    const bHasOrder = typeof b.order === 'number';
    if (aHasOrder && bHasOrder && a.order !== b.order) {
      return (a.order as number) - (b.order as number);
    }
    if (aHasOrder !== bHasOrder) {
      return aHasOrder ? -1 : 1;
    }
    const aTime = Date.parse(a.dateISO);
    const bTime = Date.parse(b.dateISO);
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
      return 0;
    }
    return bTime - aTime;
  });

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(article => article.category === category);
}
