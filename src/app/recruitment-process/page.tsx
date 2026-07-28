import { MotionReveal } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { recruitmentProcessStages } from "@/lib/site-data";

export const metadata = {
  title: "Recruitment Process"
};

const storyPhases = [
  {
    title: "PHASE 1 - CLIENT REQUIREMENT",
    steps: [1, 2],
    intro: "The order and employment terms are reviewed before recruitment begins."
  },
  {
    title: "PHASE 2 - AGREEMENT & DOCUMENTATION",
    steps: [3, 4, 5, 6],
    intro: "Commercial terms, agreements and authority documents are completed."
  },
  {
    title: "PHASE 3 - SOURCING & SCREENING",
    steps: [7, 8, 9, 10, 11],
    intro: "Recruitment planning, CV sourcing and candidate screening create the shortlist."
  },
  {
    title: "PHASE 4 - INTERVIEW & SELECTION",
    steps: [12, 13, 14, 15, 16],
    intro: "Interview, trade testing, contract signing and medical readiness are coordinated."
  },
  {
    title: "PHASE 5 - VISA & MOBILISATION",
    steps: [17, 18, 19, 20, 21, 22, 23],
    intro: "Visa, insurance, immigration, ticketing, billing and orientation are handled."
  },
  {
    title: "PHASE 6 - DEPLOYMENT & WELFARE",
    steps: [24, 25],
    intro: "Workers depart to projects and welfare follow-up continues after mobilisation."
  }
];

export default function RecruitmentProcessPage() {
  return (
    <>
      <PageHero
        title="CONTINENTAL'S RECRUITMENT PROCESS"
        text="A structured employer and candidate workflow from manpower requirement order to worker welfare follow-up."
        official
      />
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="space-y-14">
            {storyPhases.map((phase) => {
              const steps = recruitmentProcessStages
                .filter((stage) => phase.steps.includes(stage.step))
                .sort((a, b) => a.order - b.order);

              return (
                <section key={phase.title} className="process-phase">
                  <MotionReveal>
                    <div className="max-w-3xl">
                      <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">{phase.title}</p>
                      <p className="mt-3 text-base leading-7 text-slate-600">{phase.intro}</p>
                    </div>
                  </MotionReveal>
                  <div className="process-timeline mt-8">
                    {steps.map((stage, index) => {
                      const Icon = stage.icon;
                      return (
                        <MotionReveal key={stage.step} delay={index * 0.02}>
                          <article className="process-step-card">
                            <div className="process-step-marker">{stage.step}</div>
                            <div className="process-step-content">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-gold/25 bg-gold/10 text-gold">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </div>
                              <h2>{stage.title}</h2>
                            </div>
                          </article>
                        </MotionReveal>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
