import { Navbar } from "@/components/landing/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeatureHighlights } from "@/components/landing/FeatureHighlights"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { CTASection } from "@/components/landing/CTASection"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <FeatureHighlights />
        <HowItWorks />
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}
