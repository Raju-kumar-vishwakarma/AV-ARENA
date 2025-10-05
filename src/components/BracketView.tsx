import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MatchCard } from "./MatchCard";
import { Loader2 } from "lucide-react";

interface Match {
  id: string;
  tournament_id: string;
  round: number;
  match_number: number;
  player1_name: string | null;
  player2_name: string | null;
  player1_score: number;
  player2_score: number;
  winner_id: string | null;
  status: string;
  scheduled_time: string | null;
}

interface BracketViewProps {
  tournamentId: string;
}

export const BracketView = ({ tournamentId }: BracketViewProps) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();

    // Set up realtime subscription for live updates
    const channel = supabase
      .channel('matches-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'matches',
          filter: `tournament_id=eq.${tournamentId}`
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupByRound = (matches: Match[]) => {
    const rounds: { [key: number]: Match[] } = {};
    matches.forEach(match => {
      if (!rounds[match.round]) {
        rounds[match.round] = [];
      }
      rounds[match.round].push(match);
    });
    return rounds;
  };

  const getRoundName = (round: number, totalRounds: number) => {
    const roundsFromEnd = totalRounds - round;
    if (roundsFromEnd === 0) return 'Finals';
    if (roundsFromEnd === 1) return 'Semi Finals';
    if (roundsFromEnd === 2) return 'Quarter Finals';
    return `Round ${round}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No bracket matches created yet.</p>
      </div>
    );
  }

  const rounds = groupByRound(matches);
  const totalRounds = Math.max(...matches.map(m => m.round));

  return (
    <div className="space-y-8">
      <div className="flex gap-8 overflow-x-auto pb-4">
        {Object.entries(rounds).map(([roundNum, roundMatches]) => (
          <div key={roundNum} className="min-w-[280px] flex-shrink-0">
            <h3 className="text-lg font-semibold mb-4 text-center">
              {getRoundName(parseInt(roundNum), totalRounds)}
            </h3>
            <div className="space-y-4">
              {roundMatches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
