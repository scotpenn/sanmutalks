import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-[70px] bg-white">
      <div className="max-w-[1200px] mx-auto px-5 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#242424] leading-tight mb-6">
              我是 三木
            </h1>
            <p className="text-lg md:text-xl text-[#818181] mb-6 leading-relaxed">
              一个站在人生终点思考生命的殡葬师
            </p>
            <p className="text-base text-[#818181] leading-relaxed mb-8 max-w-lg">
              以殡葬师的身份，见证过上千场告别。在这里，我用最真诚的视角，和你聊聊生死、人生、家庭，以及那些我们不敢面对却终将面对的话题。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-[#242424] hover:bg-[#444444] text-white px-6 py-3 rounded-md transition-colors"
              >
                <a
                  href="https://youtube.com/@yyds3mu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" fill="white" />
                  观看视频
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#242424] text-[#242424] hover:bg-[#242424] hover:text-white px-6 py-3 rounded-md transition-colors"
              >
                <Link to="/blog" className="flex items-center gap-2">
                  阅读文章
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/sanmu-portrait.jpg"
                alt="三木"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
