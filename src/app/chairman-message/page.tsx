import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/site-data";

export const metadata = {
  title: "Founder and Chairman Message"
};

export default function ChairmanMessagePage() {
  return (
    <>
      <PageHero
        title={`Message from ${company.chairman}`}
        text="A note on ethical recruitment, talent readiness, global HR solutions and the responsibility of connecting families, employers and careers across borders."
      />
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Image src="/brand/chairman-sajeevan.png" alt="Sajeevan T S Chairman" width={900} height={650} className="rounded-lg object-cover shadow-xl" />
          <article className="prose prose-slate max-w-none">
            <p className="text-lg leading-8">
              Continental Mercantile Corporation was built on a simple belief: global opportunity must be
              handled with discipline, honesty and respect for people. Recruitment is more than filling a
              vacancy; it is the careful matching of skill, ambition, employer expectation and legal process.
            </p>
            <p>
              Our team works across global recruitment, HR solutions, talent acquisition, skill development,
              oil and gas, hotel management, healthcare, engineering, technical and professional studies.
              We aim to prepare candidates properly and support employers with reliable manpower pipelines.
            </p>
            <p>
              As the world changes, our commitment remains steady: transparent communication, compliant
              documentation, ethical placement and long-term relationships with candidates, employers and
              overseas partners.
            </p>
            <p className="font-bold text-slate-950">
              {company.chairmanFull}
              <br />
              Founder / Chairman, {company.group}
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
