export interface GamesName {
    _id: string;
    name: string;
  }
  
  export interface GamesList {
    games: GamesName[];
    timestamp: string;
  }

  export interface Comment {
    _id: string;
    unknown: number;
    user: string;
    rating: number;
    comment: string;
    ID: number;
    name: string
  }