import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getAllArticles } from '@/data/blog';

export function BlogSection() {
  // Get the 4 most recent articles
  const recentArticles = getAllArticles().slice(0, 4);
  const featuredArticle = recentArticles[0];
  const sideArticles = recentArticles.slice(1);

  return (
    <section id="blog" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#242424] mb-2">
                最新文章
              </h2>
              <p className="text-[#818181]">
                用文字记录那些触动心灵的瞬间
              </p>
            </div>
            <Link
              to="/blog"
              className="hidden sm:inline-flex items-center gap-2 text-[#242424] hover:text-[#818181] transition-colors link-underline"
            >
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Featured Article */}
          <ScrollReveal>
            <Link 
              to={`/blog/${featuredArticle.id}`}
              className="block group"
            >
              <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-[#818181] mb-2">
                <span className="px-2 py-0.5 bg-[#f5f5f5] text-[#242424] text-xs rounded-full">
                  {featuredArticle.category}
                </span>
                <span>{featuredArticle.date}</span>
                <span>·</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-[#242424] mb-2 group-hover:text-[#818181] transition-colors">
                {featuredArticle.title}
              </h3>
              <p className="text-[#818181] leading-relaxed line-clamp-2">
                {featuredArticle.excerpt}
              </p>
            </Link>
          </ScrollReveal>

          {/* Side Articles */}
          <div className="space-y-0">
            {sideArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 100}>
                <Link 
                  to={`/blog/${article.id}`}
                  className="block group py-4 border-b border-[#e0e0e0] first:pt-0"
                >
                  <div className="flex items-center gap-3 text-sm text-[#818181] mb-1">
                    <span className="px-2 py-0.5 bg-[#f5f5f5] text-[#242424] text-xs rounded-full">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-medium text-[#242424] group-hover:text-[#818181] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <ScrollReveal delay={200}>
          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#242424] hover:text-[#818181] transition-colors"
            >
              查看全部文章
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
