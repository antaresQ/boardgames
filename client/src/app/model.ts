
export interface GamesName {
    _id: string;
    name: string;
  }

export interface GamesList {
  games: GameBrief[];
  timestamp: string;
}

export interface GameBrief {
  ID: number;
  Name: string;
  Year: string;
  Rank: string;
  Average: number;
  'Bayes average': number;
  'Users rated': number;
  Url: string;
  Thumbnail: string;
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
