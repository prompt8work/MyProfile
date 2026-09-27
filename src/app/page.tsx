import type { Metadata } from "next";
import Nav from "../components/Nav";
import Hero from "../components/home/Hero";
import MetricsBand from "../components/home/MetricsBand";
import Expertise from "../components/home/Expertise";
import SelectedWork from "../components/home/SelectedWork";
import AILabBand from "../components/home/AILabBand";
import Process from "../components/home/Process";
import ContentPreview from "../components/home/ContentPreview";
import TrainingPreview from "../components/home/TrainingPreview";
import Testimonial from "../components/home/Testimonial";
import ResumeCTA from "../components/home/ResumeCTA";
import Contact from "../components/home/Contact";
import SiteFooter from "../components/SiteFooter";
import JsonLd from "../components/JsonLd";
import { buildMetadata, getCanonicalUrl } from "../lib/site";
import { personalInfo } from "../../data";

// Interim revalidation strategy until the Sanity webhook is wired up
// (needs a deployed URL first — see Phase 2 doc). SelectedWork fetches
// Sanity data inside this page's tree, so this setting covers it too.
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "PromptAtWork — Niharika Dhande",
  description: "AI Solution Engineer — prompt engineering, generative AI, RAG, AI-assisted development and automation.",
  path: "/",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  url: getCanonicalUrl("/"),
  email: `mailto:${personalInfo.email}`,
  address: personalInfo.location,
  sameAs: [`https://${personalInfo.linkedin}`],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <JsonLd data={personJsonLd} />
      <Nav />
      <Hero />
      <MetricsBand />
      <Expertise />
      <SelectedWork />
      <AILabBand />
      <Process />
      <ContentPreview />
      <TrainingPreview />
      <Testimonial />
      <ResumeCTA />
      <Contact />
      <SiteFooter />
    </div>
  );
}
