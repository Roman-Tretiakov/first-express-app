import { AvailableResolutions } from "../enums/available-resolutions";

type VideoModel = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  createdAt: string; // ISO строка даты-времени
  publicationDate: string; // ISO строка даты-времени
  availableResolutions: AvailableResolutions[];
};

export default VideoModel;
