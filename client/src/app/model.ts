export interface GamesName {
    _id: string;
    name: string;
  }
  
  export interface GamesList {
    games: GamesName[];
    timestamp: string;
  }

  export interface GamesDetails {
    _id: string;
    name: string;
    year: string;
    rank: string;
    url: string;
    thumbnail: string;
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

  export interface CommentsList {
    comments: Comment[];
  }