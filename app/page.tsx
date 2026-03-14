import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Publications } from "@/components/publications";
import { Skills } from "@/components/skills";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <CursorGlow />
      <Navigation />
      <Hero />
      <Experience />
      <Education />
      <Publications />
      <Skills />
      <Footer />
    </main>
  );
}
