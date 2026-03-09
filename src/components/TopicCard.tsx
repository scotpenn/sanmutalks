import type { LucideIcon } from 'lucide-react';

interface TopicCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function TopicCard({ icon: Icon, title, description }: TopicCardProps) {
  return (
    <div className="group p-6 bg-white rounded-lg card-hover cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center mb-4 group-hover:bg-[#242424] transition-colors duration-300">
        <Icon className="w-5 h-5 text-[#242424] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-[#242424] mb-2">{title}</h3>
      <p className="text-[#818181] leading-relaxed">{description}</p>
    </div>
  );
}
