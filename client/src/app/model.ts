
export interface GamesName {
    _id: string;
    name: string;
  }
  
  export interface GamesList {
    games: GamesName[];
    timestamp: string;
  }

  export interface GameBrief {
    ID: number;
    name: string;
    year: string;
    rank: string;
    average: number;
    bayesAverage: number;
    usersRated: number;
    url: string;
    thumbnail: string;
  }


  export interface Comment {
    _id?: string;
    unknown?: number;
    user: string;
    rating: number;
    comment: string;
    ID: number;
    name: string
  }

  export interface CommentsList {
    comments: Comment[];
  }