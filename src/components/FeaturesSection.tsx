import { Gamepad2, Trophy, Users, Zap, Target, Crown, Swords, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Trophy,
    title: "Epic Tournaments",
    description: "Compete in daily tournaments across multiple game titles with massive prize pools.",
  },
  {
    icon: Users,
    title: "Team Matchmaking",
    description: "Find your perfect squad with our intelligent team matching system.",
  },
  {
    icon: Target,
    title: "Skill-Based Ranking",
    description: "Climb the ranks with our advanced ELO rating system and seasonal leagues.",
  },
  {
    icon: Zap,
    title: "Instant Matches",
    description: "Jump into action within seconds with our lightning-fast matchmaking.",
  },
  {
    icon: Crown,
    title: "Exclusive Rewards",
    description: "Earn rare skins, badges, and in-game currency as you dominate the arena.",
  },
  {
    icon: Swords,
    title: "Custom Game Modes",
    description: "Create and host your own tournaments with custom rules and formats.",
  },
  {
    icon: Shield,
    title: "Anti-Cheat Protection",
    description: "Play fair with our military-grade anti-cheat and fraud detection system.",
  },
  {
    icon: Gamepad2,
    title: "Cross-Platform",
    description: "Compete seamlessly across PC, console, and mobile platforms.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Dominate With
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Premium Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to become a gaming legend
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-neon transition-all duration-300 hover:-translate-y-2 border-primary/30 bg-card/50 backdrop-blur"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center group-hover:scale-110 group-hover:shadow-neon transition-all duration-300 border border-primary/20">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
