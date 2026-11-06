// The YouTube section on the home page renders this file. To show a new upload, add it to the
// top of `videos`: the id is the part after "watch?v=" in the video's link.
export const channel = {
  name: "Matt",
  handle: "@mattyNetworks",
  tagline: "Networking content and personal projects.",
  url: "https://www.youtube.com/channel/UCwyAnZ0kX7KfsMGYsv1li9w",
};

export interface Video {
  /** The 11-character YouTube video id. */
  id: string;
  title: string;
  /** Upload date, YYYY-MM-DD. */
  published: string;
}

/** Newest first. */
export const videos: Video[] = [
  {
    id: "NGN3cgRT0yM",
    title: "Lab 8: EtherChannel Failure - BridgeOpsOne Academy",
    published: "2026-11-06",
  },
];

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/** hqdefault exists for every upload; the card crops its letterbox bars to 16:9. */
export const thumbnailUrl = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
