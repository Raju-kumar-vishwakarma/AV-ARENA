import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Tournament {
  id: string;
  title: string;
  game: string;
  prize_pool: string;
  max_players: number;
  current_players: number;
  start_date: string;
  status: string;
}

const TournamentsSection = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTournaments();

    const channel = supabase
      .channel("tournaments_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tournaments",
        },
        () => {
          fetchTournaments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("start_date", { ascending: true })
      .limit(4);

    if (!error && data) {
      setTournaments(data);
    }
    setLoading(false);
  };
  return (
    <section id="tournaments" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Active
            <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Tournaments
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join epic competitions and win massive prizes
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Loading tournaments...</p>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No tournaments available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tournaments.map((tournament) => (
              <Card 
                key={tournament.id} 
                className="group hover:shadow-neon transition-all duration-300 hover:-translate-y-2 border-primary/30 bg-card/50 backdrop-blur overflow-hidden"
              >
                <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant={tournament.status === "Full" ? "secondary" : "default"}
                      className={tournament.status === "Filling Fast" ? "bg-accent" : ""}
                    >
                      {tournament.status}
                    </Badge>
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold">{tournament.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{tournament.game}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-secondary" />
                    <span className="font-bold text-secondary">{tournament.prize_pool}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{tournament.current_players}/{tournament.max_players} Players</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(tournament.start_date).toLocaleDateString()}</span>
                  </div>
                  <Link to={`/tournament/${tournament.id}`}>
                    <Button 
                      className="w-full mt-4" 
                      variant={tournament.status === "Full" ? "secondary" : "default"}
                      disabled={tournament.status === "Full"}
                    >
                      {tournament.status === "Full" ? "Tournament Full" : "View Details"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/auth">
            <Button variant="gradient" size="lg" className="text-lg shadow-neon">
              <Trophy className="mr-2 h-5 w-5" />
              View All Tournaments
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;
