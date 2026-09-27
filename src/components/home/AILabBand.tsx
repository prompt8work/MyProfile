import { aiLabLinks } from "../../../data/homeContent";
import SectionHeading from "../ui/SectionHeading";
import ArrowLink from "../ui/ArrowLink";

const icons: Record<string, string> = {
  Tools: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z",
  Experiments: "M9 3h6l1 4-4 5 4 5-1 4H9l-1-4 4-5-4-5 1-4Z",
  "Prompt Library": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  Automations: "M13 2 3 14h7l-1 8 10-12h-7z",
};

export default function AILabBand() {
  return (
    <section
      id="ai-lab"
      className="w-full bg-neutral-900 bg-[radial-gradient(circle,rgba(15,180,196,0.12)_1px,transparent_1px)] bg-[length:26px_26px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-20 sm:py-24">
        <SectionHeading
          theme="dark"
          eyebrow="AI LAB"
          title="Where I Experiment"
          description="Hands-on exploration of AI tools, prompts, automations and creative workflows — documented as I build."
          action={
            <ArrowLink href="/ai-lab" theme="dark">
              Explore AI Lab
            </ArrowLink>
          }
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {aiLabLinks.map((l) => (
            <a key={l.title} href={l.href} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 flex flex-col gap-8 hover:border-cyan-700 transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan-500)" strokeWidth="1.8"><path d={icons[l.title]} /></svg>
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-white">{l.title}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-neutral-300)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
