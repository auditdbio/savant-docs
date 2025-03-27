export interface TweetMetrics {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
}

export interface TweetAuthor {
  name: string;
  username: string;
  profile_image_url: string;
}

export interface TweetMedia {
  type: string;
  url: string;
  preview_image_url?: string;
  variants?: any;
}

export interface Tweet {
  id: string;
  text: string;
  author: TweetAuthor;
  created_at: string;
  media?: TweetMedia[];
  quoted_tweet?: Tweet;
  metrics: TweetMetrics;
}
