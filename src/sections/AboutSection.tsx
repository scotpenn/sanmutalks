import { ScrollReveal } from '@/components/ScrollReveal';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="/images/about-sanmu.jpg"
                  alt="关于三木"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={100}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#242424] mb-6">
                关于三木
              </h2>
              <div className="space-y-4 text-[#818181] leading-relaxed">
                <p>
                  大家好，我是三木，一名在加拿大从业的殡葬师。
                </p>
                <p>
                  每天，我都在见证生命的告别。有人走得安详，有人带着遗憾；有人被深深爱着，有人孤独离去。这些经历让我对生命有了不一样的理解。
                </p>
                <p>
                  我创建【三木有话说】这个频道，希望能用殡葬师的独特视角，和你聊聊那些我们平常不敢谈、却终将面对的话题：死亡、告别、遗憾、爱，以及如何让活着的每一天都不留遗憾。
                </p>
                <p className="text-[#242424] font-medium">
                  死亡不是终点，遗忘才是。让我们一起，好好活着，好好告别。
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
