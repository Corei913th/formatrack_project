import { Star } from "lucide-react";
import clsx from "clsx";

export const getStarRating = (note: number) => {
  const stars = Math.ceil(note / 4); // Convert to 5-star scale
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={clsx(
        "size-4",
        i < stars ? "text-yellow-400 fill-current" : "text-gray-300"
      )}
    />
  ));
};
