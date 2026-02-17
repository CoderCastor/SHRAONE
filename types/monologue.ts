export type Visibility = "PRIVATE" | "PUBLIC";

export interface User {
  id: string;
  name: string;
  image: string;
}

export interface Episode {
  id: string;
  title: string;
  number: number;
  audioUrl: string;
}

export interface PodcastType {
  id: string;
  title: string;
  createdBy: string;
  playedCount: number | null;
  likeCount: number | null;
  commentCount: number | null;
  categories: string;
  visibility: Visibility;
  thumbnailUrl: string;
  createdAt: string; // ISO date string
  user: User;
  episodes: Episode[];
  isLiked : boolean
}

export interface PodcastResponse {
  success : boolean,
  data : PodcastType[]
}

export interface EpisodePolling {
  success: boolean;
  data: {
    id: string;
    title: string;
    number: number;
    script: string;
    audioUrl: string;
    monologueId: string;
    status: "PENDING" | "GENERATING_AUDIO" | "READY";
    monologue : {
      thumbnailUrl : "PENDING" | string
    }
  };
}


export type EpisodeStatus = "PENDING" | "GENERATED" | "FAILED";

export interface Episode {
  id: string;
  title: string | null;
  number: number;
  script: string | null;
  monologueId: string;
  status: EpisodeStatus;
}

export interface Monologue {
  id: string;
  title: string;
  createdBy: string;
  categories: string;
  thumbnailUrl: string;
  createdAt: string; // ISO date string
  episodes: Episode[];
}

export interface GenerateMonologueResponse {
  success: boolean;
  res: Monologue;
  textMessageId: string;
  ImageMessageId: string;
}

// ---- Enums ----
export type Visibility = "PRIVATE" | "PUBLIC";
export type EpisodeStatus = "PENDING" | "READY" | "FAILED";

// ---- Episode ----
export interface GetEpisode {
  id: string;
  title: string;
  number: number;
  script: string;
  audioUrl: string;
  monologueId: string;
  status: EpisodeStatus;
}

// ---- Monologue ----
export interface GetMonologue {
  id: string;
  title: string;
  createdBy: string;
  playedCount: number;
  likeCount: number;
  commentCount: number;
  categories: string;
  visibility: Visibility;
  thumbnailUrl: string;
  createdAt: string; // ISO date string
  episodes: GetEpisode[];
}

// ---- API Response ----
export interface GetMonologueResponse {
  success: boolean;
  data: GetMonologue;
}

