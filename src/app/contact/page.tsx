import type { Metadata } from "next";
import Nav from "../../components/Nav";
import PageTransition from "../../components/PageTransition";
import SiteFooter from "../../components/SiteFooter";
import Contact from "../../components/home/Contact";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact Niharika Dhande — AI Training & Prompt Engineering, Indore | PromptAtWork",
  description:
    "Get in touch with Niharika Dhande in Indore, India about prompt engineering and Generative AI training, workshops, AI consulting, job opportunities or collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageTransition className="min-h-screen bg-neutral-50">
      <Nav />
      <main>
        <div className="pt-4">
          <Contact headingLevel="page" />
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
