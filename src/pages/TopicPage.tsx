import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Flower2, Heart, Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { getTopicById, getVideosByCategory } from '@/data/content';
import { getArticleById, getArticlesByCategory } from '@/data/blog';
import { VideoCard } from '@/components/VideoCard';

const iconMap: Record<string, React.ElementType> = {
  Flower2,
  Heart,
  Sparkles,
  FileText,
};

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId || '');

  if (!topic) {
    return (
      <div className="min-h-screen bg-white pt-[70px] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#242424] mb-4">场景未找到</h1>
          <Link to="/" className="text-[#818181] hover:text-[#242424] transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const featuredArticle = getArticleById(topic.featuredArticle);
  const relatedArticles = getArticlesByCategory(topic.title)
    .filter(a => a.id !== topic.featuredArticle)
    .slice(0, 6);
  const relatedVideos = getVideosByCategory(topic.title).slice(0, 6);
  const Icon = iconMap[topic.icon] || Flower2;

  return (
    <div className="min-h-screen bg-white pt-[70px]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ backgroundColor: topic.color }}
        />
        <div className="max-w-[1200px] mx-auto px-5 relative">
          <ScrollReveal>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-[#818181] hover:text-[#242424] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Link>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: topic.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm text-[#818181] uppercase tracking-wider">
                  主题场景
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#242424] mb-4">
                {topic.title}
              </h1>
              <p className="text-lg md:text-xl text-[#818181] leading-relaxed">
                {topic.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16 md:py-20 bg-[#f5f5f5]">
          <div className="max-w-[1200px] mx-auto px-5">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-8">
                <FileText className="w-5 h-5 text-[#818181]" />
                <h2 className="text-xl font-semibold text-[#242424]">核心文章</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <Link 
                to={`/blog/${featuredArticle.id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-sm card-hover"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-[16/10] md:aspect-auto">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-[#818181] mb-3">
                      <span>{featuredArticle.date}</span>
                      <span>·</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#242424] mb-4">
                      {featuredArticle.title}
                    </h3>
                    <p className="text-[#818181] leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#242424] font-medium">
                      阅读全文
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-5">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-8">
                <Play className="w-5 h-5 text-[#818181]" />
                <h2 className="text-xl font-semibold text-[#242424]">相关视频</h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVideos.map((video, index) => (
                <ScrollReveal key={video.id} delay={index * 100}>
                  <VideoCard
                    videoId={video.id}
                    title={video.title}
                    views={video.views}
                    date={video.date}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 md:py-20 bg-[#f5f5f5]">
          <div className="max-w-[1200px] mx-auto px-5">
            <ScrollReveal>
              <div className="flex items-center gap-2 mb-8">
                <FileText className="w-5 h-5 text-[#818181]" />
                <h2 className="text-xl font-semibold text-[#242424]">更多文章</h2>
              </div>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 100}>
                  <Link 
                    to={`/blog/${article.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm card-hover"
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
                      <h3 className="font-semibold text-[#242424] line-clamp-2">
                        {article.title}
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
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#242424] mb-4">
              探索更多内容
            </h2>
            <p className="text-[#818181] mb-8 max-w-lg mx-auto">
              浏览全部文章和视频，从殡葬师的视角看懂人生
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#242424] text-white rounded-md hover:bg-[#444444] transition-colors"
              >
                <FileText className="w-4 h-4" />
                浏览全部文章
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#242424] text-[#242424] rounded-md hover:bg-[#242424] hover:text-white transition-colors"
              >
                返回首页
              </Link>
              <a
                href="https://youtube.com/@yyds3mu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#242424] text-[#242424] rounded-md hover:bg-[#242424] hover:text-white transition-colors"
              >
                <Play className="w-4 h-4" />
                观看更多视频
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
