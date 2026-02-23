import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { LabPartners } from "@/components/landing/lab-partners";
import { ConditionMarquee } from "@/components/landing/condition-marquee";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SavingsStat } from "@/components/landing/savings-stat";
import { PopularTests } from "@/components/landing/popular-tests";
import { ValueProps } from "@/components/landing/value-props";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <LabPartners />
      <ConditionMarquee />
      <HowItWorks />
      <SavingsStat />
      <PopularTests />
      <ValueProps />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
