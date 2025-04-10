import HeroSection from "@/components/hero-section"
import IndustrySection from "@/components/industry-section"
import PpaSection from "@/components/ppa-section"
import QualificationSection from "@/components/qualification-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <HeroSection />
      <IndustrySection />
      <PpaSection />
      <QualificationSection />
      <ContactSection />
    </div>
  )
}
