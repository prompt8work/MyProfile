import type { Metadata } from "next";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import Contact from "../../components/home/Contact";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — PromptAtWork",
  description: "Get in touch about job opportunities, AI consulting, training, workshops or collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Nav />
      <div className="pt-4">
        <Contact />
      </div>
      <SiteFooter />
    </div>
  );
}
