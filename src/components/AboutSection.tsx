import { Shield, Trophy, Users, Zap } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            About AV ARENA
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate competitive gaming platform where champions are born
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-card border border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all shadow-neon">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Competitive Excellence</h3>
            <p className="text-muted-foreground">
              Host and participate in professional esports tournaments with structured brackets and fair matchmaking
            </p>
          </div>

          <div className="bg-card border border-accent/30 rounded-xl p-6 hover:border-accent/60 transition-all shadow-neon">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-2">Global Community</h3>
            <p className="text-muted-foreground">
              Connect with thousands of players worldwide and build your competitive gaming network
            </p>
          </div>

          <div className="bg-card border border-secondary/30 rounded-xl p-6 hover:border-secondary/60 transition-all shadow-neon">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-Time Action</h3>
            <p className="text-muted-foreground">
              Experience live tournament updates, instant notifications, and seamless match coordination
            </p>
          </div>

          <div className="bg-card border border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-all shadow-neon">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
            <p className="text-muted-foreground">
              Advanced security measures protect your data and ensure fair play for all participants
            </p>
          </div>
        </div>

        <div className="bg-card border border-primary/30 rounded-2xl p-8 lg:p-12 shadow-neon">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-black mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-4">
              AV ARENA was built to democratize competitive gaming. We believe every player deserves access to 
              professional-grade tournament infrastructure, regardless of their skill level or location.
            </p>
            <p className="text-lg text-muted-foreground">
              From casual weekend tournaments to high-stakes championship events, we provide the tools and 
              community you need to compete, improve, and achieve victory.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
