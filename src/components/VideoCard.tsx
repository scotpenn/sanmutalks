import { Play } from 'lucide-react';

interface VideoCardProps {
  videoId: string;
  title: string;
  views: string;
  date: string;
}

export function VideoCard({ videoId, title, views, date }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block card-hover rounded-lg overflow-hidden bg-white"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-[#242424] ml-1" fill="#242424" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-[#242424] line-clamp-2 leading-snug group-hover:text-[#818181] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#818181] mt-2">
          {views} · {date}
        </p>
      </div>
    </a>
  );
}
