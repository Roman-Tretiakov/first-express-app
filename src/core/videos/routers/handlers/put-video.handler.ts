import { Request, Response } from 'express';
import { HttpStatus } from "../../../enums/http-status";
import { createErrorMessages } from "../../../utils/error.utils";
import VideoModel from "../../../types/video-model-type";
import {updateVideoInputDtoValidation} from "../../dto/video-input-dto-validation";
import {videosRepository} from "../../repositories/videos.repository";

export const putVideoHandler = (req:Request, res:Response) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(HttpStatus.BadRequest).send(createErrorMessages([{
            field: "id",
            message: `Invalid video id format: ${req.params.id}.`
        }]));
    }
    // validate request body:
    if (!req.body) {
        return res.status(HttpStatus.BadRequest).send(createErrorMessages([{
            field: "body",
            message: "Request body is missing."
        }]));
    } else {
        const errors = updateVideoInputDtoValidation(req.body);
        if (errors.length > 0) {
            return res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        }

        const id: number = parseInt(req.params.id);
        const video: VideoModel | null = videosRepository.findById(id);
        if (!video) {
            return res.status(HttpStatus.NotFound).send(`No video found by id: ${id}.`);
        }

        videosRepository.update(id, req.body);
        res.status(HttpStatus.NoContent);
    }
}

