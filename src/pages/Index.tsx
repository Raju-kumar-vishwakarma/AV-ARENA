import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TournamentsSection from "@/components/TournamentsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import CreatedBy from "@/components/CreatedBy";

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
      <CreatedBy />
    </div>
  );
};

export default Index;
