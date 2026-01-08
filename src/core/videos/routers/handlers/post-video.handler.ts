import { Request, Response } from 'express';
import { HttpStatus } from "../../../enums/http-status";
import { createErrorMessages } from "../../../utils/error.utils";
import VideoModel from "../../../types/video-model-type";
import { db } from "../../../../db/db";
import {createVideoInputDtoValidation} from "../../dto/video-input-dto-validation";
import {videosRepository} from "../../repositories/videos.repository";

export const postVideoHandler = (req:Request, res:Response) => {
    // validate request body:
    if (!req.body) {
        return res.status(HttpStatus.BadRequest).send(createErrorMessages([{
            field: "body",
            message: "Request body is missing."
        }]));
    }
    else {
        const errors = createVideoInputDtoValidation(req.body);
        if (errors.length > 0) {
            return res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        }

        const newVideo: VideoModel = {
            id: db.videos.length > 0 ? db.videos[db.videos.length - 1].id + 1 : 1,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // current date + 1 day
            ...req.body
        };

        videosRepository.create(newVideo);
        res.status(HttpStatus.Created).send(newVideo);
    }
}