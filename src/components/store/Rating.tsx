import { Star, StarHalf } from "lucide-react";

export default function Rating({
  value,
  count,
}: {
  value: number;
  count: number;
}) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-3 h-3 fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="w-3 h-3 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="w-3 h-3" />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">({count})</span>
    </div>
  );
}
