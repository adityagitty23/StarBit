import { useEffect, useState } from "react";
import restaurantConfig from "../config/restaurantConfig";
import heroSlides from "../data/heroSlides";

export default function HeroBanner({
onExploreClick,
}) {
const [currentSlide, setCurrentSlide] =
useState(0);

useEffect(() => {
const interval = setInterval(() => {
setCurrentSlide((prev) =>
prev === heroSlides.length - 1
? 0
: prev + 1
);
}, 4000);

return () => clearInterval(interval);

}, []);

const slide = heroSlides[currentSlide];

return (
<section
className="
relative
overflow-hidden
rounded-[32px]

    bg-gradient-to-br
    from-[#FF7A1A]
    via-[#FF8A34]
    to-[#FFA45B]

    shadow-[0_15px_40px_rgba(255,122,26,0.25)]

    p-5

    h-[190px]
    md:h-[260px]

    mb-6
  "
>
  {/* Background Circle */}

  <div
    className="
      absolute
      -right-20
      -bottom-20
      w-72
      h-72
      bg-white/10
      rounded-full
    "
  />

  {/* Badge */}

  <div
    className="
      inline-flex
      items-center
      px-3
      py-1

      rounded-full

      bg-white/20
      backdrop-blur-md

      text-white
      text-xs

      mb-2
    "
  >
    {slide.badge}
  </div>

  {/* Content */}

  <div className="relative z-10">

    <h1
      className="
        text-white
        font-bold

        text-xl
        md:text-3xl

        leading-tight
      "
    >
      {slide.title}
    </h1>

    <p
      className="
        mt-1

        text-orange-50

        text-xs
        md:text-base

        max-w-[180px]
      "
    >
      {slide.subtitle}
    </p>

    <button
      onClick={onExploreClick}
      className="
        mt-3

        bg-white
        text-[#FF7A1A]

        px-4
        py-2

        rounded-xl

        font-semibold

        text-sm

        shadow-md
      "
    >
      Explore Menu
    </button>

  </div>

  {/* Hero Image */}

  <img
    src={slide.image}
    alt={slide.title}
    className="
      absolute

      right-2
      bottom-0

      h-28
      md:h-52

      object-contain

      transition-all
      duration-700

      pointer-events-none
    "
  />

  {/* Rating */}

  <div
    className="
      absolute

      right-3
      bottom-3

      bg-white/15
      backdrop-blur-md

      px-3
      py-1

      rounded-xl

      text-white
      text-xs
    "
  >
    ⭐ {restaurantConfig.rating}
  </div>

  {/* Dots */}

  <div
    className="
      absolute

      left-5
      bottom-4

      flex
      gap-2
    "
  >
    {heroSlides.map((_, index) => (
      <div
        key={index}
        className={`
          h-2
          rounded-full
          transition-all
          duration-300

          ${
            currentSlide === index
              ? "w-6 bg-white"
              : "w-2 bg-white/40"
          }
        `}
      />
    ))}
  </div>
</section>

);
}
