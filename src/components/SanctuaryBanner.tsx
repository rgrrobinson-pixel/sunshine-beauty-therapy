import Image from "next/image";

export default function SanctuaryBanner() {
  return (
    <section className="relative h-64 sm:h-80 w-full overflow-hidden">
      <Image
        src="/treatment-room.jpg"
        alt="Sunshine Beauty Therapy treatment room"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide text-center px-6" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}>
          Your private sanctuary awaits
        </h2>
      </div>
    </section>
  );
}
