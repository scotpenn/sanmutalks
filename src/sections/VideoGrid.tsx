import { ScrollReveal } from '@/components/ScrollReveal';
import { VideoCard } from '@/components/VideoCard';
import { videos } from '@/data/content';

export function VideoGrid() {
  // Show first 6 videos
  const displayVideos = videos.slice(0, 6);

  return (
    <section id="videos" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#242424] mb-3">
              精选视频
            </h2>
            <p className="text-[#818181] text-base md:text-lg">
              从殡葬师的视角，看懂人生
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.map((video, index) => (
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

        <ScrollReveal delay={300}>
          <div className="text-center mt-10">
            <a
              href="https://youtube.com/@yyds3mu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#242424] hover:text-[#818181] transition-colors link-underline"
            >
              查看更多视频
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
