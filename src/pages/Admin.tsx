import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Shield, Users, Search, UserCog, Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { MatchManagement } from "@/components/MatchManagement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatedBy from "@/components/CreatedBy";

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
}

interface UserProfile {
  id: string;
  full_name: string | null;
  username: string | null;
  discord_id: string | null;
  team_name: string | null;
  avatar_url: string | null;
  experience_level: string | null;
  created_at: string;
}

interface UserWithRole extends UserProfile {
  roles: string[];
  isAdmin: boolean;
  isOwner: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedTournamentForMatches, setSelectedTournamentForMatches] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    game: "",
    description: "",
    rules: "",
    prize_pool: "",
    max_players: 512,
    start_date: "",
    end_date: "",
    status: "Open",
  });
  const [userFormData, setUserFormData] = useState({
    full_name: "",
    username: "",
    discord_id: "",
    team_name: "",
    experience_level: "",
  });

  useEffect(() => {
    checkAdmin();
    fetchTournaments();
    fetchUsers();
  }, []);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({ title: "Access Denied", description: "Please log in", variant: "destructive" });
      navigate("/auth");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);

    if (!roles || roles.length === 0) {
      toast({ title: "Access Denied", description: "Admin or Owner access required", variant: "destructive" });
      navigate("/");
      return;
    }

    const roleNames = roles.map(r => r.role);
    const hasOwner = roleNames.includes("owner");
    const hasAdmin = roleNames.includes("admin");

    if (!hasOwner && !hasAdmin) {
      toast({ title: "Access Denied", description: "Admin or Owner access required", variant: "destructive" });
      navigate("/");
      return;
    }

    setIsOwner(hasOwner);
    setIsAdmin(hasAdmin || hasOwner);
    setLoading(false);
  };

  const fetchTournaments = async () => {
    const { data, error } = await supabase
      .from("tournaments")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setTournaments(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (editingId) {
        const { error } = await supabase
          .from("tournaments")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Success", description: "Tournament updated successfully" });
      } else {
        const { error } = await supabase
          .from("tournaments")
          .insert({ ...formData, created_by: user?.id });

        if (error) throw error;
        toast({ title: "Success", description: "Tournament created successfully" });
      }

      resetForm();
      fetchTournaments();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleEdit = (tournament: Tournament) => {
    setFormData({
      title: tournament.title,
      game: tournament.game,
      description: tournament.description,
      rules: tournament.rules,
      prize_pool: tournament.prize_pool,
      max_players: tournament.max_players,
      start_date: tournament.start_date.split("T")[0],
      end_date: tournament.end_date.split("T")[0],
      status: tournament.status,
    });
    setEditingId(tournament.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;

    try {
      const { error } = await supabase
        .from("tournaments")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Success", description: "Tournament deleted successfully" });
      fetchTournaments();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      game: "",
      description: "",
      rules: "",
      prize_pool: "",
      max_players: 512,
      start_date: "",
      end_date: "",
      status: "Open",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const fetchUsers = async () => {
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError || !profiles) {
      toast({ title: "Error", description: "Failed to fetch users", variant: "destructive" });
      return;
    }

    const { data: roles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id, role");

    if (rolesError) {
      toast({ title: "Error", description: "Failed to fetch roles", variant: "destructive" });
      return;
    }

    const usersWithRoles: UserWithRole[] = profiles.map((profile) => {
      const userRoles = roles?.filter((r) => r.user_id === profile.id).map((r) => r.role) || [];
      return {
        ...profile,
        roles: userRoles,
        isAdmin: userRoles.includes("admin"),
        isOwner: userRoles.includes("owner"),
      };
    });

    setUsers(usersWithRoles);
  };

  const handleMakeOwner = async (userId: string) => {
    if (!isOwner) {
      toast({ title: "Access Denied", description: "Only owners can promote other users to owner", variant: "destructive" });
      return;
    }

    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "owner" });

      if (error) throw error;
      toast({ title: "Success", description: "User promoted to owner" });
      fetchUsers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleRemoveOwner = async (userId: string) => {
    if (!isOwner) {
      toast({ title: "Access Denied", description: "Only owners can remove owner privileges", variant: "destructive" });
      return;
    }

    if (!confirm("Are you sure you want to remove owner privileges from this user?")) return;

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "owner");

      if (error) throw error;
      toast({ title: "Success", description: "Owner privileges removed" });
      fetchUsers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    if (!isOwner) {
      toast({ title: "Access Denied", description: "Only owners can promote users to admin", variant: "destructive" });
      return;
    }

    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });

      if (error) throw error;
      toast({ title: "Success", description: "User promoted to admin" });
      fetchUsers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    if (!isOwner) {
      toast({ title: "Access Denied", description: "Only owners can remove admin privileges", variant: "destructive" });
      return;
    }

    if (!confirm("Are you sure you want to remove admin privileges from this user?")) return;

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");

      if (error) throw error;
      toast({ title: "Success", description: "Admin privileges removed" });
      fetchUsers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleEditUser = (user: UserWithRole) => {
    setUserFormData({
      full_name: user.full_name || "",
      username: user.username || "",
      discord_id: user.discord_id || "",
      team_name: user.team_name || "",
      experience_level: user.experience_level || "",
    });
    setEditingUserId(user.id);
  };

  const handleUpdateUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(userFormData)
        .eq("id", userId);

      if (error) throw error;
      toast({ title: "Success", description: "User profile updated" });
      setEditingUserId(null);
      fetchUsers();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const filteredUsers = users.filter((user) =>
    user.full_name?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.username?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.discord_id?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.team_name?.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

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

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-black">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="tournaments" className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8">
            <TabsTrigger value="tournaments">
              <Shield className="h-4 w-4 mr-2" />
              Tournaments
            </TabsTrigger>
            <TabsTrigger value="matches">
              <Trophy className="h-4 w-4 mr-2" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tournaments">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setShowForm(!showForm)}>
                <Plus className="mr-2 h-4 w-4" />
                {showForm ? "Cancel" : "New Tournament"}
              </Button>
            </div>

            {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingId ? "Edit Tournament" : "Create New Tournament"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Tournament Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="game">Game *</Label>
                    <Input
                      id="game"
                      value={formData.game}
                      onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prize_pool">Prize Pool *</Label>
                    <Input
                      id="prize_pool"
                      value={formData.prize_pool}
                      onChange={(e) => setFormData({ ...formData, prize_pool: e.target.value })}
                      placeholder="$10,000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="max_players">Max Players *</Label>
                    <Input
                      id="max_players"
                      type="number"
                      value={formData.max_players}
                      onChange={(e) => setFormData({ ...formData, max_players: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_date">Start Date *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date">End Date *</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="Open">Open</option>
                      <option value="Filling Fast">Filling Fast</option>
                      <option value="Full">Full</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="rules">Rules</Label>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">{editingId ? "Update" : "Create"} Tournament</Button>
                  {editingId && <Button type="button" variant="outline" onClick={resetForm}>Cancel Edit</Button>}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

            <div className="grid grid-cols-1 gap-6">
              {tournaments.map((tournament) => (
                <Card key={tournament.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{tournament.title}</h3>
                        <p className="text-muted-foreground mb-4">{tournament.game}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Prize Pool:</span>
                            <p className="font-bold">{tournament.prize_pool}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Players:</span>
                            <p className="font-bold">{tournament.current_players}/{tournament.max_players}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p className="font-bold">{tournament.status}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Start Date:</span>
                            <p className="font-bold">{new Date(tournament.start_date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(tournament)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(tournament.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matches">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Tournament</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedTournamentForMatches} onValueChange={setSelectedTournamentForMatches}>
                    <SelectTrigger className="w-full max-w-md">
                      <SelectValue placeholder="Choose a tournament to manage matches" />
                    </SelectTrigger>
                    <SelectContent>
                      {tournaments.map((tournament) => (
                        <SelectItem key={tournament.id} value={tournament.id}>
                          {tournament.title} - {tournament.game}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {selectedTournamentForMatches && (
                <MatchManagement tournamentId={selectedTournamentForMatches} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, username, Discord ID, or team..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    {editingUserId === user.id ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold flex items-center gap-2">
                            <UserCog className="h-5 w-5" />
                            Edit User Profile
                          </h3>
                          {user.isAdmin && <Badge variant="default">Admin</Badge>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name</Label>
                            <Input
                              value={userFormData.full_name}
                              onChange={(e) => setUserFormData({ ...userFormData, full_name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Username</Label>
                            <Input
                              value={userFormData.username}
                              onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Discord ID</Label>
                            <Input
                              value={userFormData.discord_id}
                              onChange={(e) => setUserFormData({ ...userFormData, discord_id: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Team Name</Label>
                            <Input
                              value={userFormData.team_name}
                              onChange={(e) => setUserFormData({ ...userFormData, team_name: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Experience Level</Label>
                            <Input
                              value={userFormData.experience_level}
                              onChange={(e) => setUserFormData({ ...userFormData, experience_level: e.target.value })}
                              placeholder="Beginner, Intermediate, Advanced, Pro"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdateUser(user.id)}>
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setEditingUserId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                        <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{user.full_name || "No Name"}</h3>
                            {user.isOwner && <Badge variant="destructive">Owner</Badge>}
                            {user.isAdmin && !user.isOwner && <Badge variant="default">Admin</Badge>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Username:</span>
                              <p className="font-medium">{user.username || "Not set"}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Discord ID:</span>
                              <p className="font-medium">{user.discord_id || "Not set"}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Team:</span>
                              <p className="font-medium">{user.team_name || "No team"}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Experience:</span>
                              <p className="font-medium">{user.experience_level || "Not set"}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Joined:</span>
                              <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {isOwner && (
                            <>
                              {user.isOwner ? (
                                <Button variant="destructive" size="sm" onClick={() => handleRemoveOwner(user.id)}>
                                  <Shield className="h-4 w-4 mr-1" />
                                  Remove Owner
                                </Button>
                              ) : (
                                <Button variant="default" size="sm" onClick={() => handleMakeOwner(user.id)}>
                                  <Shield className="h-4 w-4 mr-1" />
                                  Make Owner
                                </Button>
                              )}
                              {user.isAdmin && !user.isOwner ? (
                                <Button variant="destructive" size="sm" onClick={() => handleRemoveAdmin(user.id)}>
                                  <Shield className="h-4 w-4 mr-1" />
                                  Remove Admin
                                </Button>
                              ) : !user.isOwner ? (
                                <Button variant="default" size="sm" onClick={() => handleMakeAdmin(user.id)}>
                                  <Shield className="h-4 w-4 mr-1" />
                                  Make Admin
                                </Button>
                              ) : null}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <CreatedBy />
    </div>
  );
};

export default Admin;
