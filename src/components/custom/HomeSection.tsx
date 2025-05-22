import FadeIn from "./FadeIn";
import { TechCard } from "./TechCard";
import {
  SiNextdotjs,
  SiGraphql,
  SiSupabase,
  SiFramer,
  SiTailwindcss,
} from "react-icons/si";

function HomeSection() {
  return (
    <div>
      <section className="px-6 py-20 sm:py-28 bg-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Built From Real Struggles
            </h2>
          </FadeIn>
          <FadeIn>
            <p className="text-muted-foreground text-base sm:text-lg">
              Job hunting can be overwhelming — missed follow-ups, lost notes,
              no overview of progress. JobTracker was born from these
              frustrations, built to bring clarity and control to your job
              search.
            </p>
          </FadeIn>
          <FadeIn>
            <blockquote className="italic text-muted-foreground text-sm">
              "You can't improve what you don't track."
            </blockquote>
          </FadeIn>
        </div>
      </section>
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          <FadeIn>
            <div>
              <h3 className="text-3xl font-bold">12+</h3>
              <p className="text-muted-foreground text-sm">Jobs Managed</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h3 className="text-3xl font-bold">30+</h3>
              <p className="text-muted-foreground text-sm">Notes &amp; Reminders</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h3 className="text-3xl font-bold">8</h3>
              <p className="text-muted-foreground text-sm">Filter Types</p>
            </div>
          </FadeIn>
          <FadeIn>
            <div>
              <h3 className="text-3xl font-bold">6+</h3>
              <p className="text-muted-foreground text-sm">Techs Used</p>
            </div>
          </FadeIn>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4 text-center">Built With</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <TechCard icon={<SiNextdotjs />} label="Next.js" />
          <TechCard icon={<SiTailwindcss />} label="Tailwind" />
          <TechCard icon={<SiGraphql />} label="GraphQL" />
          <TechCard icon={<SiSupabase />} label="Supabase" />
          <TechCard icon={<SiFramer />} label="Framer Motion" />
        </div>
      </section>
    </div>
  );
}
export default HomeSection;
