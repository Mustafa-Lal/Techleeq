import { MessageSquare, ClipboardList, Rocket, Handshake } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Tell Us Your Goals',
    description: 'Start with a quick conversation about your business, challenges, and priorities.',
  },
  {
    number: '02',
    icon: ClipboardList,
    title: 'Shape the Solution',
    description: 'We turn your requirements into a clear, practical plan for your team.',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Launch with Confidence',
    description: 'Our specialists implement your solution and help your team get started smoothly.',
  },
  {
    number: '04',
    icon: Handshake,
    title: 'Grow with Ongoing Support',
    description: 'Stay supported as your business evolves, with guidance whenever you need it.',
  },
];

export function HowItWorks() {
  return (
    <section className="max-md:min-h-0 min-h-[100dvh] w-full flex flex-col justify-center bg-[var(--color-bg-base)] snap-start px-[20px] md:px-[40px] py-20 md:py-12">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-primary)] font-semibold mb-4">
            HOW IT WORKS
          </p>
          <h2 className="font-['Syne'] text-[40px] md:text-[40px] font-bold leading-tight text-[var(--color-text-primary)] mb-4">
            A straightforward path to better operations
          </h2>
          <p className="text-[17px] text-[var(--color-text-secondary)] leading-relaxed">
            From your first conversation to long-term growth, we are with you at every step.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">


          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step Card */}
              <div className="text-center">
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <span className="font-['Syne'] text-[64px] font-bold gradient-text opacity-80 leading-none">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-[56px] h-[56px] mx-auto mb-4 rounded-full bg-[var(--color-bg-surface)] border-2 border-[var(--color-primary)] flex items-center justify-center">
                  <step.icon size={28} className="text-[var(--color-primary)]" />
                </div>

                {/* Title */}
                <h3 className="font-['DM_Sans'] text-[22px] font-semibold text-[var(--color-text-primary)] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
