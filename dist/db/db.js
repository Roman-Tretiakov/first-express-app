"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.db = {
    videos: [
        {
            id: 1,
            title: "Властелин колец",
            author: "Питер Джексон",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2006-01-01T12:00:00.000Z",
            publicationDate: "2006-01-02T12:00:00.000Z",
            availableResolutions: ["P144", "P240", "P360"],
        },
        {
            id: 2,
            title: "Слово пацана",
            author: "Джон Винн",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2024-02-01T12:00:00.000Z",
            publicationDate: "2024-02-02T12:00:00.000Z",
            availableResolutions: ["P480", "P720"],
        },
        {
            id: 3,
            title: "Jurassic Park",
            author: "Steven Spielberg",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: "2021-02-01T12:00:00.000Z",
            publicationDate: "2021-02-02T12:00:00.000Z",
            availableResolutions: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"],
        }
    ],
};
