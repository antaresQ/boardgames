
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


export interface GameDetail {
  _id?: string,
  index: number,
  'Abstract Game Rank': number,
  'Accessory Rank': string,
  'Amiga Rank': string,
  'Arcade Rank': string,
  'Atari ST Rank': string,
  'Board Game Rank': number,
  'Children\'s Game Rank': string,
  'Commodore 64 Rank': string,
  'Customizable Rank': string,
  'Family Game Rank': number,
  'Party Game Rank': string,
  'RPG Item Rank': string,
  'Strategy Game Rank': number,
  'Thematic Rank': string,
  'Video Game Rank': string,
  'War Game Rank': string,
  alternate: string,
  average: number,
  averageweight: number,
  bayesaverage: number,
  boardgameartist: string,
  boardgamecategory: string,
  boardgamecompilation: string,
  boardgamedesigner: string,
  boardgameexpansion: string,
  boardgamefamily: string,
  boardgameimplementation: string,
  boardgameintegration: string,
  boardgamemechanic: string,
  boardgamepublisher: string,
  description: string,
  id: number,
  image: string,
  maxplayers: number,
  maxplaytime: number,
  median: number,
  minage: number,
  minplayers: number,
  minplaytime: number,
  numcomments: number,
  numweights: number,
  owned: number,
  playingtime: number,
  stddev: number,
  'suggested_language_dependence': string,
  'suggested_num_players': string,
  'suggested_playerage': string,
  thumbnail: string,
  trading: number,
  type: string,
  usersrated: number,
  wanting: number,
  wishing: number,
  yearpublished: number
}
