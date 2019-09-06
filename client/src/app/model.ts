export interface GamesName {
    _id: string;
    name: string;
  }
  
  export interface GamesList {
    games: GamesName[];
    timestamp: string;
  }