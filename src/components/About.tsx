import Image from "next/image";

export default function About({
  intro,
  massage,
  bio,
  guaranteeQuote,
  phone,
  phoneHref,
  email,
  portraitSize = "compact",
}: {
  intro: string;
  massage: string;
  bio: string;
  guaranteeQuote: string;
  phone: string;
  phoneHref: string;
  email: string;
  portraitSize?: "standard" | "compact";
}) {
  const sizeClass = portraitSize === "standard" ? "max-w-md" : "max-w-[340px]";

  return (
    <section id="about" className="max-w-content mx-auto px-6 py-20 sm:py-28">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`relative aspect-[4/5] w-full ${sizeClass} mx-auto md:mx-0`}>
          <Image
            src="/jane-original.jpg"
            alt="Jane Guthrie, principal of Sunshine Beauty Therapy"
            fill
            className="object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div>
          <p className="eyebrow">Welcome to Sunshine Beauty Therapy</p>
          <h2 className="section-heading mt-3">
            A personal touch in every treatment
          </h2>

          <div className="mt-6 space-y-4 text-ink/80 leading-relaxed">
            <p>{intro}</p>
            <p>{massage}</p>
            <p>{bio}</p>
          </div>

          <blockquote className="mt-6 border-l-4 border-sage-400 pl-5 italic text-ink/70">
            <p>&ldquo;{guaranteeQuote}&rdquo;</p>
            <footer className="mt-3 not-italic text-sm font-semibold text-ink">
              — Jane Guthrie, Principal
            </footer>
          </blockquote>

          <div className="mt-6 flex flex-wrap gap-4">
            <a href={phoneHref} className="btn-outline">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="btn-outline">
              {email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
