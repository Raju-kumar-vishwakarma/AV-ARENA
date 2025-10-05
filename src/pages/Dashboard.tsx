import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Calendar, DollarSign, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import CreatedBy from "@/components/CreatedBy";

interface Registration {
  id: string;
  status: string;
  registered_at: string;
  tournaments: {
    id: string;
    title: string;
    game: string;
    prize_pool: string;
    start_date: string;
    status: string;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({ title: "Please log in", description: "You must be logged in to view your dashboard" });
      navigate("/auth");
      return;
    }

    setUser(user);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(profileData);

    const { data: regsData, error } = await supabase
      .from("tournament_registrations")
      .select(`
        id,
        status,
        registered_at,
        tournaments (
          id,
          title,
          game,
          prize_pool,
          start_date,
          status
        )
      `)
      .eq("user_id", user.id)
      .order("registered_at", { ascending: false });

    if (!error && regsData) {
      setRegistrations(regsData as any);
    }

    setLoading(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">My Dashboard</h1>
          <p className="text-xl text-muted-foreground">Welcome back, {profile?.username || user?.email}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>My Tournament Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-xl mb-4">No tournament registrations yet</p>
                    <Link to="/">
                      <Button>Browse Tournaments</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {registrations.map((reg) => (
                      <Card key={reg.id} className="border-primary/30">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{reg.tournaments.title}</h3>
                              <p className="text-muted-foreground">{reg.tournaments.game}</p>
                            </div>
                            <Badge variant={reg.status === "confirmed" ? "default" : "secondary"}>
                              {reg.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-secondary" />
                              <div>
                                <p className="text-muted-foreground">Prize Pool</p>
                                <p className="font-bold">{reg.tournaments.prize_pool}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-muted-foreground">Start Date</p>
                                <p className="font-bold">{new Date(reg.tournaments.start_date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-accent" />
                              <div>
                                <p className="text-muted-foreground">Status</p>
                                <p className="font-bold">{reg.tournaments.status}</p>
                              </div>
                            </div>
                          </div>
                          <Link to={`/tournament/${reg.tournaments.id}`}>
                            <Button variant="outline" className="w-full mt-4">
                              View Details
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </div>
                  <Link to="/profile">
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                {profile?.username && (
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-semibold">{profile.username}</p>
                  </div>
                )}
                {profile?.discord_id && (
                  <div>
                    <p className="text-sm text-muted-foreground">Discord ID</p>
                    <p className="font-semibold">{profile.discord_id}</p>
                  </div>
                )}
                {profile?.team_name && (
                  <div>
                    <p className="text-sm text-muted-foreground">Team Name</p>
                    <p className="font-semibold">{profile.team_name}</p>
                  </div>
                )}
                {profile?.experience_level && (
                  <div>
                    <p className="text-sm text-muted-foreground">Experience Level</p>
                    <p className="font-semibold capitalize">{profile.experience_level}</p>
                  </div>
                )}
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Total Registrations</p>
                  <p className="text-3xl font-black text-primary">{registrations.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <CreatedBy/>
    </div>
  );
};

export default Dashboard;
