export default function BackgroundGlow() {
return (
<>
{/* Top Left Glow */}

  <div
    className="
      fixed
      top-[-120px]
      left-[-120px]

      w-[320px]
      h-[320px]

      bg-[#FF7A1A]

      opacity-10

      blur-[120px]

      rounded-full

      pointer-events-none

      z-0
    "
  />

  {/* Bottom Right Glow */}

  <div
    className="
      fixed
      bottom-[-150px]
      right-[-150px]

      w-[380px]
      h-[380px]

      bg-[#FF7A1A]

      opacity-15

      blur-[140px]

      rounded-full

      pointer-events-none

      z-0
    "
  />
</>

);
}
