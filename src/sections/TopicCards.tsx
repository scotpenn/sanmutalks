import { Link } from 'react-router-dom';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Flower2, Heart, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { topics } from '@/data/content';

const iconMap: Record<string, React.ElementType> = {
  Flower2,
  Heart,
  Sparkles,
  FileText,
};

export function TopicCards() {
  return (
    <section id="topics" className="py-16 md:py-24 bg-[#f5f5f5]">
      <div className="max-w-[1200px] mx-auto px-5">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#242424] mb-3">
              不同场景
            </h2>
            <p className="text-[#818181] text-base md:text-lg">
              生命有多重面貌，每一个都值得被理解
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => {
            const Icon = iconMap[topic.icon] || Flower2;
            return (
              <ScrollReveal key={topic.id} delay={index * 100}>
                <Link
                  to={`/topic/${topic.id}`}
                  className="group block p-6 bg-white rounded-lg card-hover h-full"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                    style={{ backgroundColor: `${topic.color}15` }}
                  >
                    <Icon 
                      className="w-5 h-5 transition-colors duration-300" 
                      style={{ color: topic.color }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#242424] mb-2">{topic.title}</h3>
                  <p className="text-[#818181] leading-relaxed mb-4">{topic.shortDesc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-[#242424] opacity-0 group-hover:opacity-100 transition-opacity">
                    了解更多
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
