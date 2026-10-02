import type { Metadata } from "next";
import Nav from "../components/Nav";
import PageTransition from "../components/PageTransition";
import Hero from "../components/home/Hero";
import AboutMe from "../components/home/AboutMe";
import AILabBand from "../components/home/AILabBand";
import ContentPreview from "../components/home/ContentPreview";
import TrainingPreview from "../components/home/TrainingPreview";
import Testimonial from "../components/home/Testimonial";
import ResumeCTA from "../components/home/ResumeCTA";
import Contact from "../components/home/Contact";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import { buildMetadata } from "../lib/site";
import { homeJsonLd } from "../lib/seo";

// Interim revalidation strategy until the Sanity webhook is wired up
// (needs a deployed URL first — see Phase 2 doc). ContentPreview and
// TrainingPreview fetch Sanity data inside this page's tree.
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Niharika Dhande — Prompt Engineer & Generative AI Trainer in Indore | PromptAtWork",
  description:
    "Niharika Dhande is a Full-Stack AI Engineer, prompt engineer and Generative AI trainer based in Indore, India. Prompt engineering training, RAG, LLM apps and AI automation — built and taught in the open.",
  path: "/",
});

export default function Home() {
  return (
    <PageTransition className="min-h-screen bg-neutral-50">
      <JsonLd data={homeJsonLd} />
      <Nav />
      <main>
        <Hero />
        <AboutMe />
        <AILabBand />
        <ContentPreview />
        <TrainingPreview />
        <Testimonial />
        <ResumeCTA />
        <Contact />
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
