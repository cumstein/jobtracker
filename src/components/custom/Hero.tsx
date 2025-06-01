import Link from "next/link";
import FadeIn from "./FadeIn";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-6 pt-8 pb-20 sm:pt-12 sm:pb-24 md:pt-16 md:pb-32 text-center max-w-3xl mx-auto">
      <FadeIn>
        <div className="flex justify-center mb-8">
          <Image
            src="/job-tracker.svg"
            alt="JobTracker Logo"
            width={192}
            height={192}
            className="w-32 h-32 sm:w-48 sm:h-48"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Stay on top of your job applications.
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8">
          Track every job you apply to. Organize notes, reminders, tags, and get
          smart insights — all in one place.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 text-base font-medium bg-primary text-white rounded-xl dark:text-black shadow hover:opacity-90 transition"
        >
          Go to Dashboard
        </Link>
      </FadeIn>
    </section>
  );
}
