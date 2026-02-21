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

// {
//     "success": true,
//     "data": {
//         "id": "cmlkhtqm8000os6r1impz69am",
//         "title": "Monalisa Painting",
//         "createdBy": "cmhm7c8wb0000s6z0jp564kjx",
//         "categories": "Science",
//         "createdAt": "2026-02-13T06:15:03.678Z",
//         "episodes": [
//             {
//                 "id": "cmlq7h5xc0006s686i3pbu1pj",
//                 "title": null,
//                 "number": 4,
//                 "script": null,
//                 "audioUrl": null,
//                 "monologueId": "cmlkhtqm8000os6r1impz69am",
//                 "status": "PENDING"
//             }
//         ]
//     },
//     "messageId": "1771308717899-0"
// }

export interface generateNextEpisodeResponseType {
  success: boolean;
  data: {
    id: string;
    title: string;
    createdBy: string;
    categories: string;
    createdAt: string;
    episodes: {
      id: string;
      title: string;
      number: number;
      script: string;
      audioUrl: string;
      monologueId: string;
      status: "PENDING" | "GENERATING_AUDIO" | "READY";
    }[];
  };
  messageId: string
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
  isLiked: boolean;
}

export interface PodcastResponse {
  success: boolean;
  data: PodcastType[];
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
    monologue: {
      thumbnailUrl: "PENDING" | string;
    };
  };
}

export type GetEpisodeStatus = "PENDING" | "READY" | "FAILED";

export interface GetEpisode {
  id: string;
  title: string | null;
  number: number;
  script: string | null;
  monologueId: string;
  status: GetEpisodeStatus;
}

export interface Monologue {
  id: string;
  title: string;
  createdBy: string;
  categories: string;
  thumbnailUrl: string;
  createdAt: string; // ISO date string
  episodes: GetEpisode[];
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
  isLiked : boolean
}

// ---- API Response ----
export interface GetMonologueResponse {
  success: boolean;
  data: GetMonologue;
}
