import { MotionReveal } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { recruitmentProcessStages } from "@/lib/site-data";

export const metadata = {
  title: "Recruitment Process"
};

const phaseIntro: Record<string, string> = {
  "PHASE 1 - REQUIREMENT & AGREEMENT": "Requirement order, employment terms, fees, agreements and interview authority documents.",
  "PHASE 2 - PLANNING & SOURCING": "Recruitment method planning, interview itinerary, CV search, advertising and candidate screening.",
  "PHASE 3 - INTERVIEW & SELECTION": "Interview preparation, client or authorised interviews, trade testing, contracts and medical checks.",
  "PHASE 4 - VISA & MOBILISATION": "Visa files, insurance, immigration, ticketing, billing, orientation and departure support.",
  "PHASE 5 - POST-DEPLOYMENT SUPPORT": "Follow-up and welfare monitoring after workers are mobilized to the project."
};

export default function RecruitmentProcessPage() {
  const phases = Array.from(new Set(recruitmentProcessStages.map((stage) => stage.phase)));

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
            {phases.map((phase) => {
              const steps = recruitmentProcessStages
                .filter((stage) => stage.phase === phase)
                .sort((a, b) => a.order - b.order);

              return (
                <section key={phase} className="process-phase">
                  <MotionReveal>
                    <div className="max-w-3xl">
                      <p className="text-sm font-black uppercase tracking-[0.24em] text-gold">{phase}</p>
                      <p className="mt-3 text-base leading-7 text-slate-600">{phaseIntro[phase]}</p>
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
