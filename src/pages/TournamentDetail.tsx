import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Users, Calendar, DollarSign, ArrowLeft, Clock, Layout } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Tournament {
  id: string;
  title: string;
  game: string;
  description: string;
  rules: string;
  prize_pool: string;
  max_players: number;
  current_players: number;
  start_date: string;
  end_date: string;
  status: string;
  image_url: string;
}

const TournamentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: "",
    discord_id: "",
    team_name: "",
    experience_level: "beginner",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData);
          setFormData({
            username: profileData.username || "",
            discord_id: profileData.discord_id || "",
            team_name: profileData.team_name || "",
            experience_level: profileData.experience_level || "beginner",
          });
        }

        const { data: regData } = await supabase
          .from("tournament_registrations")
          .select("*")
          .eq("tournament_id", id)
          .eq("user_id", user.id)
          .single();
        
        setIsRegistered(!!regData);
      }

      const { data, error } = await supabase
        .from("tournaments")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast({ title: "Error", description: "Failed to load tournament", variant: "destructive" });
        navigate("/");
      } else {
        setTournament(data);
      }
      setLoading(false);
    };

    fetchData();
  }, [id, navigate, toast]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({ title: "Please log in", description: "You must be logged in to register" });
      navigate("/auth");
      return;
    }

    if (!formData.username || !formData.discord_id) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    if (tournament && tournament.current_players >= tournament.max_players) {
      toast({ title: "Tournament Full", description: "This tournament has reached maximum capacity", variant: "destructive" });
      return;
    }

    try {
      // Update profile
      await supabase
        .from("profiles")
        .update({
          username: formData.username,
          discord_id: formData.discord_id,
          team_name: formData.team_name,
          experience_level: formData.experience_level,
        })
        .eq("id", user.id);

      // Create registration
      const { error } = await supabase
        .from("tournament_registrations")
        .insert({
          tournament_id: id,
          user_id: user.id,
          registration_data: formData,
          status: "confirmed",
        });

      if (error) throw error;

      // Update current players count
      await supabase
        .from("tournaments")
        .update({ current_players: (tournament?.current_players || 0) + 1 })
        .eq("id", id);

      toast({ title: "Success!", description: "You have successfully registered for the tournament" });
      setIsRegistered(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex gap-4 mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tournaments
            </Button>
          </Link>
          <Link to={`/tournament/${id}/bracket`}>
            <Button>
              <Layout className="mr-2 h-4 w-4" />
              View Bracket
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-4xl mb-2">{tournament.title}</CardTitle>
                    <p className="text-xl text-muted-foreground">{tournament.game}</p>
                  </div>
                  <Badge variant={tournament.status === "Full" ? "secondary" : "default"}>
                    {tournament.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Prize Pool</p>
                      <p className="font-bold text-secondary">{tournament.prize_pool}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Players</p>
                      <p className="font-bold">{tournament.current_players}/{tournament.max_players}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-bold">{new Date(tournament.start_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-bold">{new Date(tournament.end_date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {tournament.description && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Description</h3>
                    <p className="text-muted-foreground">{tournament.description}</p>
                  </div>
                )}

                {tournament.rules && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Rules</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{tournament.rules}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {isRegistered ? "Already Registered" : "Register for Tournament"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isRegistered ? (
                  <div className="text-center py-6">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <p className="text-lg font-semibold mb-2">You're Registered!</p>
                    <p className="text-muted-foreground">Good luck in the tournament!</p>
                    <Link to="/dashboard">
                      <Button className="mt-4 w-full">View My Tournaments</Button>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username *</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord_id">Discord ID *</Label>
                      <Input
                        id="discord_id"
                        value={formData.discord_id}
                        onChange={(e) => setFormData({ ...formData, discord_id: e.target.value })}
                        placeholder="username#1234"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="team_name">Team Name (Optional)</Label>
                      <Input
                        id="team_name"
                        value={formData.team_name}
                        onChange={(e) => setFormData({ ...formData, team_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience_level">Experience Level</Label>
                      <select
                        id="experience_level"
                        value={formData.experience_level}
                        onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                    <Button type="submit" className="w-full" disabled={tournament.status === "Full"}>
                      {tournament.status === "Full" ? "Tournament Full" : "Register Now"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
