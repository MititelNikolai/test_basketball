export interface CardProps {
  //General
  id: number;
  name: string;
  type: "team" | "player";
  //Team
  foundationYear?: number;
  imageUrl?: string;
  //Player
  number?: number;
  team?: string;
  avatarUrl?: string;
}
