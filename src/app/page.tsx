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
import { buildMetadata, getCanonicalUrl } from "../lib/site";
import { personalInfo } from "../../data";

// Interim revalidation strategy until the Sanity webhook is wired up
// (needs a deployed URL first — see Phase 2 doc). ContentPreview and
// TrainingPreview fetch Sanity data inside this page's tree.
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "PromptAtWork — Niharika Dhande, Full-Stack AI Engineer",
  description:
    "Full-Stack AI Engineer — prompt engineering, generative AI, RAG, AI-assisted development and automation.",
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
    <PageTransition className="min-h-screen bg-neutral-50">
      <JsonLd data={personJsonLd} />
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
