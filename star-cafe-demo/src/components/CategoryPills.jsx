const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Burgers", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Drinks", icon: "🥤" },
  { name: "Desserts", icon: "🍰" },
  { name: "Snacks", icon: "🍟" },
];

export default function CategoryPills({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div
      className="
        flex
        gap-2
        overflow-x-auto
        pb-2

        md:flex-wrap
        md:overflow-visible

        scrollbar-hide
      "
    >
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() =>
            setSelectedCategory(category.name)
          }
          className={`
            flex
            items-center
            gap-2

            px-4
            py-2.5

            rounded-2xl
            whitespace-nowrap

            transition-all
            duration-200

            ${
              selectedCategory === category.name
                ? `
                  bg-[#FF7A1A]
                  text-white
                  shadow-md
                `
                : `
                  bg-white/70
                  backdrop-blur-md
                  border
                  border-white/50
                  text-gray-700
                `
            }
          `}
        >
          <span>{category.icon}</span>

          <span className="font-medium text-sm">
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}