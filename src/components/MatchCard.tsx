import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface MatchCardProps {
  match: {
    id: string;
    round: number;
    match_number: number;
    player1_name: string | null;
    player2_name: string | null;
    player1_score: number;
    player2_score: number;
    winner_id: string | null;
    status: string;
    scheduled_time: string | null;
  };
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const isWinner = (playerNum: 1 | 2) => {
    if (!match.winner_id) return false;
    // This is simplified - in real implementation, you'd need to track player IDs
    return match.status === 'completed' && 
           ((playerNum === 1 && match.player1_score > match.player2_score) ||
            (playerNum === 2 && match.player2_score > match.player1_score));
  };

  return (
    <Card className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className={getStatusColor(match.status)}>
            {match.status.replace('_', ' ').toUpperCase()}
          </Badge>
          {match.scheduled_time && (
            <span className="text-xs text-muted-foreground">
              {format(new Date(match.scheduled_time), 'MMM d, HH:mm')}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className={`flex justify-between items-center p-2 rounded ${
            isWinner(1) ? 'bg-primary/20 border border-primary/50' : 'bg-muted/50'
          }`}>
            <span className="font-medium">
              {match.player1_name || 'TBD'}
            </span>
            <span className="font-bold text-lg">{match.player1_score}</span>
          </div>

          <div className="text-center text-xs text-muted-foreground">VS</div>

          <div className={`flex justify-between items-center p-2 rounded ${
            isWinner(2) ? 'bg-primary/20 border border-primary/50' : 'bg-muted/50'
          }`}>
            <span className="font-medium">
              {match.player2_name || 'TBD'}
            </span>
            <span className="font-bold text-lg">{match.player2_score}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
