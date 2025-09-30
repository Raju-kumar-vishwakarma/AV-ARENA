import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";
import Navbar from "@/components/Navbar";

const profileSchema = z.object({
  full_name: z.string().trim().min(1, "Name is required").max(100),
  username: z.string().trim().min(3, "Username must be at least 3 characters").max(50),
  team_name: z.string().trim().max(100).optional(),
  phone_no: z.string().trim().regex(/^\+?[\d\s-()]+$/, "Invalid phone number").max(20).optional(),
  date_of_birth: z.date().optional(),
});

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({ title: "Please log in", variant: "destructive" });
      navigate("/auth");
      return;
    }

    setUserId(user.id);

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      toast({ title: "Error loading profile", variant: "destructive" });
      setLoading(false);
      return;
    }

    if (profileData) {
      setFullName(profileData.full_name || "");
      setUsername(profileData.username || "");
      setTeamName(profileData.team_name || "");
      setPhoneNo(profileData.phone_no || "");
      setTeamMembers(profileData.team_members || []);
      if (profileData.date_of_birth) {
        setDateOfBirth(new Date(profileData.date_of_birth));
      }
    }
    setLoading(false);
  };

  const addTeamMember = () => {
    if (newMember.trim() && !teamMembers.includes(newMember.trim())) {
      setTeamMembers([...teamMembers, newMember.trim()]);
      setNewMember("");
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const validatedData = profileSchema.parse({
        full_name: fullName,
        username,
        team_name: teamName || undefined,
        phone_no: phoneNo || undefined,
        date_of_birth: dateOfBirth,
      });

      setSaving(true);
      setErrors({});

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: validatedData.full_name,
          username: validatedData.username,
          team_name: validatedData.team_name,
          phone_no: validatedData.phone_no,
          date_of_birth: validatedData.date_of_birth ? format(validatedData.date_of_birth, "yyyy-MM-dd") : null,
          team_members: teamMembers,
        })
        .eq("id", userId);

      if (error) throw error;

      toast({ title: "Profile updated successfully!" });
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({ title: "Please fix the errors", variant: "destructive" });
      } else {
        toast({ title: "Error updating profile", variant: "destructive" });
      }
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
              {errors.full_name && <p className="text-sm text-destructive">{errors.full_name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNo">Phone Number</Label>
              <Input
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="+1234567890"
              />
              {errors.phone_no && <p className="text-sm text-destructive">{errors.phone_no}</p>}
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name"
              />
            </div>

            <div className="space-y-2">
              <Label>Team Members</Label>
              <div className="flex gap-2">
                <Input
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  placeholder="Add team member name"
                  onKeyPress={(e) => e.key === "Enter" && addTeamMember()}
                />
                <Button type="button" onClick={addTeamMember} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{member}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => removeTeamMember(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSave} disabled={saving} className="flex-1">
                {saving ? "Saving..." : "Save Profile"}
              </Button>
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
