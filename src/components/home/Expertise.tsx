import { expertise } from "../../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";

const icons: Record<string, { path: string; tint: "plum" | "cyan" }> = {
  "Prompt Engineering": { path: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", tint: "plum" },
  "AI Solution Engineering": { path: "m12 2 9 4.9v10.2L12 22l-9-4.9V6.9Z M3 7l9 5 9-5M12 12v10", tint: "plum" },
  RAG: { path: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM21 21l-4.3-4.3", tint: "cyan" },
  "AI Automation": { path: "M13 2 3 14h7l-1 8 10-12h-7z", tint: "cyan" },
  "AI-Assisted Development": { path: "m16 18 6-6-6-6M8 6l-6 6 6 6", tint: "plum" },
  "AI Tool Exploration": { path: "M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0", tint: "plum" },
};

export default function Expertise() {
  return (
    <section id="expertise" className="w-full">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-24 sm:py-28">
        <SectionHeading
          eyebrow="WHAT I DO"
          title="Core Expertise"
          action={
            <p className="max-w-[380px] text-sm text-neutral-600 leading-relaxed">
              Six practical disciplines I combine to move from idea to shipped AI system.
            </p>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((card) => {
            const icon = icons[card.title];
            const tintBg = icon.tint === "plum" ? "bg-plum-100" : "bg-neutral-100";
            const tintStroke = icon.tint === "plum" ? "text-plum-700" : "text-cyan-700";
            return (
              <div key={card.title} className="bg-white border border-neutral-200 rounded-2xl p-7 flex flex-col gap-4">
                <span className={`w-[46px] h-[46px] rounded-xl ${tintBg} flex items-center justify-center`}>
                  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" className={tintStroke} stroke="currentColor" strokeWidth="1.8">
                    <path d={icon.path} />
                  </svg>
                </span>
                <h3 className="font-display text-lg font-semibold text-neutral-900">{card.title}</h3>
                <ul className="flex flex-col gap-2">
                  {card.items.map((item) => (
                    <li key={item} className="relative pl-3.5 text-[13.5px] text-neutral-600">
                      <span className="absolute left-0 top-[8px] w-1 h-1 rounded-full bg-neutral-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
