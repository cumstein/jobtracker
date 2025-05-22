import { Briefcase, StickyNote, Tags, BellRing } from "lucide-react";
import FadeIn from "./FadeIn";

const features = [
  {
    icon: Briefcase,
    title: "Application Tracking",
    description: "Easily log and monitor all your job applications in one place.",
  },
  {
    icon: StickyNote,
    title: "Personal Notes",
    description: "Write down key details and ideas for every job opportunity.",
  },
  {
    icon: Tags,
    title: "Smart Tagging",
    description: "Organize jobs with custom tags and quick filters.",
  },
  {
    icon: BellRing,
    title: "Reminders",
    description: "Never miss a follow-up with smart, customizable reminders.",
  },
];

export default function Feature() {
  return (
    <section className="px-6 py-20 sm:py-28 bg-muted">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why JobTracker?</h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Designed for job seekers who want to stay organized, focused, and ahead of the competition.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {features.map((feature, idx) => (
          <FadeIn key={idx}>
            <div className="flex gap-4 items-start">
              <feature.icon className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}