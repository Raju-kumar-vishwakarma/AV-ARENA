import { Button } from "@/components/ui/button";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Gamepad2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-wider">JOIN THE ARENA TODAY</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            Ready to Become a
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Gaming Legend?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of players competing for glory, prizes, and bragging rights. 
            Your journey to the top starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/auth">
              <Button variant="gradient" size="lg" className="text-lg group shadow-neon">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg border-primary/50 hover:border-primary">
                Contact Us
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground pt-4 font-semibold">
            Free to join • No credit card required • Play now
          </p>
        </div>
      </div>
      
      {/* Decorative blur orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
};

export default CTASection;
