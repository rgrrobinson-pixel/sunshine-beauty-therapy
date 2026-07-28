import Image from "next/image";

export default function About({
  intro,
  massage,
  bio,
  guaranteeQuote,
  phone,
  phoneHref,
  email,
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
  return (
    <section id="about" className="max-w-content mx-auto px-6 pt-20 sm:pt-28 pb-0">
      <p className="eyebrow text-center">Welcome to Sunshine Beauty Therapy</p>
      <h2 className="section-heading mt-3 text-center">
        A personal touch in every treatment
      </h2>

      <div className="mt-10">
        {/* Small portrait floated left — text wraps around it */}
        <div
          className="float-left mr-8 mb-4 flex-shrink-0"
          style={{ width: "220px", height: "220px" }}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg">
            <Image
              src="/jane-original.jpg"
              alt="Jane Guthrie, principal of Sunshine Beauty Therapy"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="space-y-4 text-ink/80 leading-relaxed">
          <p>{intro}</p>
          <p>{massage}</p>
          <p>{bio}</p>
        </div>

        {/* Clear float before blockquote */}
        <div className="clear-both" />

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

      {/* Treatment room photo */}
      <div className="mt-14 relative w-full overflow-hidden rounded-2xl shadow-md" style={{ height: "480px" }}>
        <Image
          src="/treatment-room.jpg"
          alt="The Sunshine Beauty Therapy treatment room — serene, private and fully equipped"
          fill
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
