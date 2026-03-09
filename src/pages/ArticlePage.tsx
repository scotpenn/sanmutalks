import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getArticleById, getArticlesByCategory } from '@/data/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function getText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return getText((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-');
}

export function ArticlePage() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = getArticleById(articleId || '');

  if (!article) {
    return (
      <div className="min-h-screen bg-white pt-[70px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#242424] mb-4">文章未找到</h1>
          <Link to="/blog" className="text-[#818181] hover:text-[#242424] transition-colors">
            返回文章列表
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  const headingCounts = new Map<string, number>();
  const toc: TocItem[] = article.content
    .split('\n')
    .map(line => {
      const match = /^(#{2,4})\s+(.+)$/.exec(line.trim());
      if (!match) return null;
      const level = match[1].length;
      const text = match[2].trim();
      const baseId = slugify(text);
      const count = (headingCounts.get(baseId) ?? 0) + 1;
      headingCounts.set(baseId, count);
      const id = count > 1 ? `${baseId}-${count}` : baseId;
      return { id, text, level };
    })
    .filter((item): item is TocItem => Boolean(item));

  let headingIndex = 0;

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      {/* Article Header */}
      <section className="py-12 md:py-16 bg-[#f5f5f5]">
        <div className="max-w-[800px] mx-auto px-5">
          <ScrollReveal>
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-[#818181] hover:text-[#242424] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={50}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#242424] text-white text-sm rounded-full">
                {article.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-[#818181]">
                <Calendar className="w-4 h-4" />
                {article.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-[#818181]">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#242424] leading-tight mb-6">
              {article.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="text-lg text-[#818181] leading-relaxed">
              {article.excerpt}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="max-w-[1000px] mx-auto px-5">
          <ScrollReveal>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 md:py-12">
        <div className="max-w-[800px] mx-auto px-5">
          {toc.length > 0 && (
            <ScrollReveal>
              <div className="mb-10 rounded-lg border border-[#e0e0e0] bg-white p-5">
                <div className="text-sm font-semibold text-[#242424] mb-3">目录</div>
                <ul className="space-y-2 text-sm text-[#555]">
                  {toc.map(item => (
                    <li
                      key={item.id}
                      className={item.level === 3 ? 'pl-4' : item.level === 4 ? 'pl-8' : ''}
                    >
                      <a href={`#${item.id}`} className="hover:text-[#242424] transition-colors">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}
          <ScrollReveal>
            <article className="prose prose-lg max-w-none">
              <div className="text-[#242424] leading-[1.8] space-y-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => {
                      const text = getText(children);
                      const id = toc[headingIndex]?.id ?? slugify(text);
                      headingIndex += 1;
                      return (
                        <h2 id={id} className="text-2xl font-bold text-[#242424] mt-10 mb-4">
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => {
                      const text = getText(children);
                      const id = toc[headingIndex]?.id ?? slugify(text);
                      headingIndex += 1;
                      return (
                        <h3 id={id} className="text-xl font-semibold text-[#242424] mt-8 mb-3">
                          {children}
                        </h3>
                      );
                    },
                    h4: ({ children }) => {
                      const text = getText(children);
                      const id = toc[headingIndex]?.id ?? slugify(text);
                      headingIndex += 1;
                      return (
                        <h4 id={id} className="text-lg font-semibold text-[#242424] mt-6 mb-2">
                          {children}
                        </h4>
                      );
                    },
                    p: ({ children }) => (
                      <p className="text-[#555]">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-2 text-[#555]">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-2 text-[#555]">{children}</ol>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="text-[#555] pl-4 border-l-2 border-[#e0e0e0]">{children}</blockquote>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </article>
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal delay={100}>
            <div className="mt-10 pt-6 border-t border-[#e0e0e0]">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-[#818181]" />
                <span className="text-sm text-[#818181]">标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-[#f5f5f5] text-[#242424] text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Share */}
          <ScrollReveal delay={150}>
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-4 h-4 text-[#818181]" />
                <span className="text-sm text-[#818181]">分享</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <Twitter className="w-4 h-4 text-[#242424]" />
                </button>
                <button 
                  className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <Facebook className="w-4 h-4 text-[#242424]" />
                </button>
                <button 
                  className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e0e0e0] transition-colors"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('链接已复制到剪贴板');
                  }}
                >
                  <LinkIcon className="w-4 h-4 text-[#242424]" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f5f5f5]">
          <div className="max-w-[1000px] mx-auto px-5">
            <ScrollReveal>
              <h2 className="text-xl font-semibold text-[#242424] mb-6">
                相关文章
              </h2>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <ScrollReveal key={relatedArticle.id} delay={index * 100}>
                  <Link 
                    to={`/blog/${relatedArticle.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm card-hover"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-[#818181] mb-2">
                        <span>{relatedArticle.date}</span>
                      </div>
                      <h3 className="font-medium text-[#242424] line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <ScrollReveal>
            <h2 className="text-xl font-semibold text-[#242424] mb-4">
              喜欢这篇文章？
            </h2>
            <p className="text-[#818181] mb-6">
              订阅三木有话说，获取更多深度内容
            </p>
            <a
              href="https://youtube.com/@yyds3mu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#242424] text-white rounded-md hover:bg-[#444444] transition-colors"
            >
              订阅 YouTube 频道
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
