import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SponsorsSection } from "@/components/home/SponsorsSection";
import { ContributorsSection } from "@/components/home/ContributorsSection";
import { SupportSection } from "@/components/home/SupportSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen border-t">
      <HeroSection />
      <FeaturesSection />
      <SponsorsSection />
      <ContributorsSection />
      <SupportSection />
    </div>
  );
}
