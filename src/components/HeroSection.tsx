import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import gamingHero from "@/assets/gaming-hero.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${gamingHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-primary/20" />
        {/* Blare/blur effect overlay */}
        <div className="absolute inset-0 backdrop-blur-md" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-24 mx-auto">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/60 via-accent/40 to-secondary/60 border border-primary/40 shadow-neon animate-fade-in animate-bounce">
        <Zap className="w-4 h-4 text-primary animate-pulse" />
        <span className="text-sm font-bold text-foreground tracking-wider drop-shadow-neon">NEXT-GEN GAMING PLATFORM</span>
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-8xl font-black tracking-tight animate-fade-in animate-text-glow">
        <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent drop-shadow-neon font-extrabold">
          AV ARENA
        </span>
        <br />
        <span className="text-foreground text-4xl md:text-6xl mt-4 block text-[#f8fafc] font-extrabold animate-flicker">
          Where Champions Are Made
        </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
        The ultimate Discord bot for <span className="text-accent font-semibold animate-pulse">Esports</span> and{" "}
        <span className="text-primary font-semibold animate-pulse">Scrims</span> communities. Automate tournaments,
        manage registrations, and track results with zero hassle.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
        <Link to="/auth">
            <Button variant="hero" size="lg" className="text-lg shadow-neon group animate-bounce-slow">
            <Gamepad2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Start Playing Now
            </Button>
        </Link>
        <a href="#tournaments">
          <Button variant="outline" size="lg" className="text-lg border-primary/50 hover:border-primary animate-pulse">
            <Trophy className="mr-2 h-5 w-5" />
            View Tournaments
          </Button>
        </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
        <div className="space-y-2 group hover:scale-110 transition-transform animate-fade-in">
          <div className="text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-neon animate-pulse">
            50K+
          </div>
          <div className="text-sm text-foreground/80 font-semibold">Active Players</div>
        </div>
        <div className="space-y-2 group hover:scale-110 transition-transform animate-fade-in">
          <div className="text-5xl font-black bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent drop-shadow-neon animate-pulse">
            1000+
          </div>
          <div className="text-sm text-foreground/80 font-semibold">Tournaments</div>
        </div>
        <div className="space-y-2 group hover:scale-110 transition-transform animate-fade-in">
          <div className="text-5xl font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent drop-shadow-neon animate-pulse">
            $2M+
          </div>
          <div className="text-sm text-foreground/80 font-semibold">Prize Pool</div>
        </div>
          </div>
        </div>
      </div>

      {/* Decorative neon orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default HeroSection;