interface ArticleCardProps {
  title: string;
  excerpt?: string;
  date: string;
  readTime?: string;
  image?: string;
  variant?: 'featured' | 'compact';
}

export function ArticleCard({
  title,
  excerpt,
  date,
  readTime,
  image,
  variant = 'compact',
}: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <article className="group cursor-pointer">
        <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-[#818181] mb-2">
          <span>{date}</span>
          {readTime && (
            <>
              <span>·</span>
              <span>{readTime}</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-semibold text-[#242424] mb-2 group-hover:text-[#818181] transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="text-[#818181] leading-relaxed line-clamp-3">{excerpt}</p>
        )}
      </article>
    );
  }

  return (
    <article className="group cursor-pointer py-4 border-b border-[#e0e0e0] last:border-b-0">
      <div className="flex items-center gap-3 text-sm text-[#818181] mb-1">
        <span>{date}</span>
        {readTime && (
          <>
            <span>·</span>
            <span>{readTime}</span>
          </>
        )}
      </div>
      <h3 className="font-medium text-[#242424] group-hover:text-[#818181] transition-colors line-clamp-2">
        {title}
      </h3>
    </article>
  );
}
