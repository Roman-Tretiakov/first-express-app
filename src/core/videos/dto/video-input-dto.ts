export type CreateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: string[];
};

export type UpdateVideoInputModel = {
    title: string;
    author: string;
    availableResolutions: string[];
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    publicationDate: string;
}
