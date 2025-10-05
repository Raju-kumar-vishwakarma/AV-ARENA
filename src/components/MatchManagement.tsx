import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MatchManagementProps {
  tournamentId: string;
}

interface Match {
  id: string;
  round: number;
  match_number: number;
  player1_name: string | null;
  player2_name: string | null;
  player1_score: number;
  player2_score: number;
  status: string;
  scheduled_time: string | null;
}

export const MatchManagement = ({ tournamentId }: MatchManagementProps) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [editingMatch, setEditingMatch] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, [tournamentId]);

  const fetchMatches = async () => {
    try {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('tournament_id', tournamentId)
        .order('round', { ascending: true })
        .order('match_number', { ascending: true });

      if (error) throw error;
      setMatches(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMatch = async () => {
    try {
      const maxRound = matches.length > 0 ? Math.max(...matches.map(m => m.round)) : 0;
      const matchesInRound = matches.filter(m => m.round === maxRound + 1).length;
      
      const { error } = await supabase
        .from('matches')
        .insert({
          tournament_id: tournamentId,
          round: maxRound + 1,
          match_number: matchesInRound + 1,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Match created successfully"
      });
      fetchMatches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateMatch = async (matchId: string, updates: Partial<Match>) => {
    try {
      const { error } = await supabase
        .from('matches')
        .update(updates)
        .eq('id', matchId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Match updated successfully"
      });
      fetchMatches();
      setEditingMatch(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteMatch = async (matchId: string) => {
    try {
      const { error } = await supabase
        .from('matches')
        .delete()
        .eq('id', matchId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Match deleted successfully"
      });
      fetchMatches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Match Management</CardTitle>
          <Button onClick={handleCreateMatch} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Match
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {matches.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No matches yet. Create your first match!
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Round</TableHead>
                <TableHead>Match #</TableHead>
                <TableHead>Player 1</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Player 2</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{match.round}</TableCell>
                  <TableCell>{match.match_number}</TableCell>
                  <TableCell>
                    {editingMatch === match.id ? (
                      <Input
                        defaultValue={match.player1_name || ''}
                        onBlur={(e) =>
                          handleUpdateMatch(match.id, { player1_name: e.target.value })
                        }
                        className="w-32"
                      />
                    ) : (
                      match.player1_name || 'TBD'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMatch === match.id ? (
                      <Input
                        type="number"
                        defaultValue={match.player1_score}
                        onBlur={(e) =>
                          handleUpdateMatch(match.id, {
                            player1_score: parseInt(e.target.value)
                          })
                        }
                        className="w-16"
                      />
                    ) : (
                      match.player1_score
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMatch === match.id ? (
                      <Input
                        defaultValue={match.player2_name || ''}
                        onBlur={(e) =>
                          handleUpdateMatch(match.id, { player2_name: e.target.value })
                        }
                        className="w-32"
                      />
                    ) : (
                      match.player2_name || 'TBD'
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMatch === match.id ? (
                      <Input
                        type="number"
                        defaultValue={match.player2_score}
                        onBlur={(e) =>
                          handleUpdateMatch(match.id, {
                            player2_score: parseInt(e.target.value)
                          })
                        }
                        className="w-16"
                      />
                    ) : (
                      match.player2_score
                    )}
                  </TableCell>
                  <TableCell>
                    {editingMatch === match.id ? (
                      <Select
                        defaultValue={match.status}
                        onValueChange={(value) =>
                          handleUpdateMatch(match.id, { status: value })
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      match.status
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={editingMatch === match.id ? "default" : "outline"}
                        onClick={() =>
                          setEditingMatch(editingMatch === match.id ? null : match.id)
                        }
                      >
                        {editingMatch === match.id ? (
                          <>
                            <Save className="h-4 w-4" />
                          </>
                        ) : (
                          'Edit'
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteMatch(match.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
