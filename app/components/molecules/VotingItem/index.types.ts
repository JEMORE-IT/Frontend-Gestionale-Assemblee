export default interface VotingItemProps {
    id: number;
    text: string;
    votes: {
      favorevoli: number;
      contrari: number;
      astenuti: number;
    };
    onDelete: (id: number) => void;
  }
  