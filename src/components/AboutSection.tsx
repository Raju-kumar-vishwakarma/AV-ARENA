import { Shield, Trophy, Users, Zap, ChevronLeft, ChevronRight, Star, Calendar, Award, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

const AboutSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({
    players: 0,
    tournaments: 0,
    prizePool: 0,
    countries: 0,
  });

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      players: 50000,
      tournaments: 1000,
      prizePool: 2000000,
      countries: 150,
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        players: Math.floor(targets.players * progress),
        tournaments: Math.floor(targets.tournaments * progress),
        prizePool: Math.floor(targets.prizePool * progress),
        countries: Math.floor(targets.countries * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Pro Gamer",
      game: "Valorant",
      rating: 5,
      text: "AV ARENA has completely transformed my competitive gaming experience. The tournament structure is professional and the community is amazing!",
      avatar: "🎮"
    },
    {
      name: "Sarah Martinez",
      role: "Tournament Organizer",
      game: "League of Legends",
      rating: 5,
      text: "The best platform for organizing esports events. The bracket system is intuitive and the real-time updates keep everyone engaged.",
      avatar: "🏆"
    },
    {
      name: "James Wilson",
      role: "Content Creator",
      game: "CS:GO",
      rating: 5,
      text: "I've tried many platforms, but AV ARENA stands out with its seamless matchmaking and professional-grade infrastructure.",
      avatar: "⚡"
    },
  ];

  const timeline = [
    { year: "2023", title: "Launch", description: "AV ARENA goes live with 1,000 players" },
    { year: "2023 Q2", title: "10K Milestone", description: "Reached 10,000 active players" },
    { year: "2023 Q3", title: "Global Expansion", description: "Expanded to 50+ countries" },
    { year: "2024", title: "Major Tournaments", description: "$1M+ in prize pools distributed" },
    { year: "2024 Q2", title: "50K Players", description: "Community reached 50,000+ gamers" },
  ];

  const teamMembers = [
    { name: "Marcus Johnson", role: "Founder & CEO", specialty: "Former Pro Gamer", icon: "👨‍💼" },
    { name: "Emily Zhang", role: "CTO", specialty: "Platform Architecture", icon: "👩‍💻" },
    { name: "David Kim", role: "Head of Esports", specialty: "Tournament Operations", icon: "🎯" },
    { name: "Lisa Anderson", role: "Community Manager", specialty: "Player Experience", icon: "👥" },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10 space-y-24">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            About AV ARENA
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate competitive gaming platform where champions are born
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all">
            <CardContent className="p-2 text-center cursor-pointer">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-black text-primary mb-1">
                {stats.players.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-accent/30 hover:border-accent/60 transition-all">
            <CardContent className="p-6 text-center cursor-pointer">
              <Trophy className="w-8 h-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-black text-accent mb-1">
                {stats.tournaments.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Tournaments</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-secondary/30 hover:border-secondary/60 transition-all">
            <CardContent className="p-6 text-center cursor-pointer">
              <Award className="w-8 h-8 text-secondary mx-auto mb-3" />
              <div className="text-3xl font-black text-secondary mb-1">
                ${(stats.prizePool / 1000000).toFixed(1)}M+
              </div>
              <div className="text-sm text-muted-foreground">Prize Pool</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all">
            <CardContent className= "p-6 text-center cursor-pointer">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-black text-primary mb-1">
                {stats.countries}+
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Tabs */}
        <Tabs defaultValue="mission" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="mission">Our Mission</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="mission" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all hover:-translate-y-2">
                <CardContent className="p-6 cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Competitive Excellence</h3>
                  <p className="text-muted-foreground">
                    Host and participate in professional esports tournaments with structured brackets and fair matchmaking
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-accent/30 hover:border-accent/60 transition-all hover:-translate-y-2">
                <CardContent className="p-6 cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Community</h3>
                  <p className="text-muted-foreground">
                    Connect with thousands of players worldwide and build your competitive gaming network
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-secondary/30 hover:border-secondary/60 transition-all hover:-translate-y-2">
                <CardContent className="p-6 cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Real-Time Action</h3>
                  <p className="text-muted-foreground">
                    Experience live tournament updates, instant notifications, and seamless match coordination
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all hover:-translate-y-2">
                <CardContent className="p-6 cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                  <p className="text-muted-foreground">
                    Advanced security measures protect your data and ensure fair play for all participants
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur border-primary/30 shadow-neon">
              <CardContent className="p-8 lg:p-12 ">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  <h3 className="text-3xl font-black">Our Mission</h3>
                  <p className="text-lg text-muted-foreground">
                    AV ARENA was built to democratize competitive gaming. We believe every player deserves access to 
                    professional-grade tournament infrastructure, regardless of their skill level or location.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    From casual weekend tournaments to high-stakes championship events, we provide the tools and 
                    community you need to compete, improve, and achieve victory.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                      Join Our Community
                    </Button>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card 
                  key={index}
                  className="bg-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all hover:-translate-y-2 group cursor-pointer"
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {member.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-primary font-semibold mb-2">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.specialty}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card/50 backdrop-blur border-primary/30 mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're always looking for passionate individuals who want to shape the future of competitive gaming.
                </p>
                <Button size="lg" variant="outline">
                  View Open Positions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary hidden md:block" />
                
                {/* Timeline items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex flex-col md:flex-row items-center gap-8 ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      <Card className={`flex-1 bg-card/50 backdrop-blur border-primary/30 hover:border-primary/60 transition-all hover:-translate-y-1 ${
                        index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2" style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold text-primary">{item.year}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                      
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-background z-10 flex-shrink-0 hidden md:block" />
                      
                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-black text-center mb-8">
            What Players Say
          </h3>
          
          <Card className="bg-card/50 backdrop-blur border-primary/30">
            <CardContent className="p-8 lg:p-12">
              <div className="relative">
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  
                  <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
                    &quot;{testimonials[currentTestimonial].text}&quot;
                  </p>
                  
                  <div>
                    <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                    <p className="text-primary">{testimonials[currentTestimonial].role}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].game}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentTestimonial 
                            ? 'bg-primary w-8' 
                            : 'bg-muted-foreground/30'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;