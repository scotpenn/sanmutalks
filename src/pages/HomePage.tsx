import { Hero } from '@/sections/Hero';
import { VideoGrid } from '@/sections/VideoGrid';
import { TopicCards } from '@/sections/TopicCards';
import { BlogSection } from '@/sections/BlogSection';
import { AboutSection } from '@/sections/AboutSection';

export function HomePage() {
  return (
    <main>
      <Hero />
      <VideoGrid />
      <TopicCards />
      <BlogSection />
      <AboutSection />
    </main>
  );
}
