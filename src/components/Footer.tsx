import Image from "next/image";
import Link from "next/link";

export default function Footer({
  phone,
  phoneHref,
  email,
  termsUrl,
  logoUrl,
}: {
  phone: string;
  phoneHref: string;
  email: string;
  termsUrl: string;
  logoUrl: string;
}) {
  return (
    <footer className="bg-sage-900 text-cream-100/90">
      <div className="max-w-content mx-auto px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="mt-4 text-sm text-cream-100/70 leading-relaxed">
            Private organic beauty treatments on the Sunshine Coast in
            Brindabella Avenue, Peregian Springs. By appointment only.
          </p>
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <a href={phoneHref} className="hover:text-white">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-white">
              {email}
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Treatments</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream-100/70">
            <li><a href="#services" className="hover:text-white">Organic Facial Packages</a></li>
            <li><a href="#services" className="hover:text-white">Massage Packages</a></li>
            <li><a href="#services" className="hover:text-white">Body Treatments</a></li>
            <li><a href="#skincare" className="hover:text-white">Juniper Skincare</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Information</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream-100/70">
            <li><a href="#about" className="hover:text-white">About Jane</a></li>
            <li><a href="#gift" className="hover:text-white">Gift Certificates</a></li>
            <li><a href="#testimonials" className="hover:text-white">Client Reviews</a></li>
            <li>
              <a href={termsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Terms &amp; Cancellations
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-white">Book a Treatment</h3>
          <p className="mt-4 text-sm text-cream-100/70">
            Online booking available 24/7 via the button below, or call Jane
            directly.
          </p>
          <Link href="/book" className="btn-light mt-4 inline-flex">
            Book Now
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 px-6 text-center text-xs text-cream-100/60">
        <p>© {new Date().getFullYear()} Sunshine Beauty Therapy. All rights reserved.</p>
        <p className="mt-1">
          Designed with care on the Sunshine Coast, Queensland.
        </p>
      </div>
    </footer>
  );
}
