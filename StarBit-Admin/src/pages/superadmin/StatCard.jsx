export default function StatCard({
  title,
  value,
  color = "text-gray-900",
}) {
  return (
    <div
      className="
        bg-white/70
        backdrop-blur-xl

        border
        border-white/60

        rounded-3xl

        p-6

        shadow-lg

        hover:shadow-xl
        hover:-translate-y-1

        transition-all
        duration-300
      "
    >
      <p
        className="
          text-gray-500
          text-sm
          font-medium
        "
      >
        {title}
      </p>

      <h2
        className={`
          text-4xl
          font-bold
          mt-3
          ${color}
        `}
      >
        {value}
      </h2>
    </div>
  );
}