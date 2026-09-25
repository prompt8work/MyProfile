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

// Interim revalidation strategy until the Sanity webhook is wired up
// (needs a deployed URL first — see Phase 2 doc). SelectedWork fetches
// Sanity data inside this page's tree, so this setting covers it too.
export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
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
