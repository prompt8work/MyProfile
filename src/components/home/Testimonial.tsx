export default function Testimonial() {
  return (
    <section className="w-full bg-plum-100">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-20 sm:py-[88px]">
        <div className="max-w-[720px] mx-auto text-center flex flex-col items-center gap-5">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="var(--color-plum-600)">
            <path d="M9.5 7C6.5 7 4 9.5 4 12.5S6.5 18 9.5 18c.4 0 .8 0 1.1-.1-1 2-2.8 3.4-5.1 3.9l.5 1.7c4.4-1 7.5-4.6 7.5-9.5C13.5 10.5 12 7 9.5 7Zm10 0c-3 0-5.5 2.5-5.5 5.5S16.5 18 19.5 18c.4 0 .8 0 1.1-.1-1 2-2.8 3.4-5.1 3.9l.5 1.7c4.4-1 7.5-4.6 7.5-9.5C23.5 10.5 22 7 19.5 7Z" />
          </svg>
          <p className="font-display text-2xl italic font-medium text-neutral-900 leading-relaxed">
            [ Client or colleague testimonial to be added — one quote on the impact of working with Niharika. ]
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="w-[42px] h-[42px] rounded-full bg-neutral-300 flex items-center justify-center font-mono text-[11px] text-neutral-600">
              [ ]
            </span>
            <div className="text-left">
              <div className="text-sm font-semibold text-neutral-900">[ Name ]</div>
              <div className="text-[12.5px] text-neutral-600">[ Role, Company ]</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
