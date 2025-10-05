import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TournamentsSection from "@/components/TournamentsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <TournamentsSection />
        <FeaturesSection />
        <AboutSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
