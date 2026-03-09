import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { topics } from '@/data/content';
import { getAllArticles } from '@/data/blog';

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const articles = getAllArticles();
  const categories = ['全部', ...topics.map(t => t.title)];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory && selectedCategory !== '全部' 
      ? article.category === selectedCategory 
      : true;
    const matchesSearch = searchQuery 
      ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles[0];
  const recentArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-[#f5f5f5]">
        <div className="max-w-[1200px] mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-[#242424] mb-4">
                文章合集
              </h1>
              <p className="text-[#818181] text-lg max-w-2xl mx-auto">
                用文字记录那些触动心灵的瞬间，从殡葬师的视角看懂人生
              </p>
            </div>
          </ScrollReveal>

          {/* Search Bar */}
          <ScrollReveal delay={100}>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#818181]" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#e0e0e0] focus:outline-none focus:border-[#242424] transition-colors"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 border-b border-[#e0e0e0] sticky top-[70px] bg-white z-40">
        <div className="max-w-[1200px] mx-auto px-5">
          <ScrollReveal>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <span className="text-sm text-[#818181] whitespace-nowrap mr-2">分类：</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === '全部' ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    (category === '全部' && !selectedCategory) || selectedCategory === category
                      ? 'bg-[#242424] text-white'
                      : 'bg-[#f5f5f5] text-[#242424] hover:bg-[#e0e0e0]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Article */}
      {!selectedCategory && !searchQuery && featuredArticle && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-5">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-[#242424] text-white text-xs rounded-full">
                  精选
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Link 
                to={`/blog/${featuredArticle.id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-lg card-hover"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] lg:aspect-auto">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-[#818181] mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredArticle.date}
                      </span>
                      <span>·</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-[#242424] mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-[#818181] leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredArticle.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-[#f5f5f5] text-[#818181] text-sm rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-[#242424] font-medium">
                      阅读全文
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-[#242424]">
                {selectedCategory || searchQuery ? '搜索结果' : '全部文章'}
              </h2>
              <span className="text-sm text-[#818181]">
                共 {recentArticles.length} 篇
              </span>
            </div>
          </ScrollReveal>

          {recentArticles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 50}>
                  <Link 
                    to={`/blog/${article.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm card-hover h-full"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-sm text-[#818181] mb-2">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-[#242424] mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#818181] line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.slice(0, 2).map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-0.5 bg-[#f5f5f5] text-[#a5a5a5] text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-[#e0e0e0] mx-auto mb-4" />
              <p className="text-[#818181]">没有找到相关文章</p>
            </div>
          )}
        </div>
      </section>

      {/* Topics CTA */}
      <section className="py-16 md:py-20 bg-[#f5f5f5]">
        <div className="max-w-[1200px] mx-auto px-5">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#242424] mb-3">
                按主题浏览
              </h2>
              <p className="text-[#818181]">
                选择你感兴趣的主题，深入探索
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <ScrollReveal key={topic.id} delay={index * 50}>
                <Link
                  to={`/topic/${topic.id}`}
                  className="block p-6 bg-white rounded-lg card-hover text-center"
                >
                  <h3 className="font-semibold text-[#242424] mb-1">{topic.title}</h3>
                  <p className="text-sm text-[#818181]">{topic.shortDesc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
