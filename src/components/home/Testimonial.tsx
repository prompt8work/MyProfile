import { getPublishedTestimonials } from "../../supabase/testimonialRepository";
import ArrowLink from "../ui/ArrowLink";
import Reveal from "../motion/Reveal";
import Carousel from "../motion/Carousel";
import TestimonialQuote from "../testimonials/TestimonialQuote";

// Data-driven, not a static placeholder: pulls the published testimonials
// from the testimonial table. Per the master content doc's own rule (§15 —
// "empty fields should be hidden rather than replaced with fake content"),
// this renders nothing at all until at least one real testimonial has been
// submitted and approved, rather than showing permanent bracketed
// placeholder text (the exact kind of gap the Phase 7 launch check flagged).
export default async function Testimonial() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="w-full bg-plum-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-20 sm:py-[88px]">
        <Reveal className="flex flex-col items-center gap-7">
          <Carousel
            label="Testimonials"
            slides={testimonials.map((t) => (
              <TestimonialQuote
                key={t.id}
                quote={t.quote}
                name={t.name}
                detail={[t.role, t.organization].filter(Boolean).join(", ") || undefined}
              />
            ))}
          />
          <ArrowLink href="/testimonials" size="sm">
            Read more testimonials
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  );
}
