import { Request, Response } from 'express';
import { HttpStatus } from "../../../enums/http-status";
import { createErrorMessages } from "../../../utils/error.utils";
import VideoModel from "../../../types/video-model-type";
import { db } from "../../../../db/db";

export function deleteVideoHandler(req:Request, res:Response) {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(HttpStatus.BadRequest).send(createErrorMessages([{
            field: "id",
            message: `Invalid video id format: ${req.params.id}.`
        }]));
    }
    const id: number = parseInt(req.params.id);
    const video: VideoModel | undefined = db.videos.find((video) => video.id === id);
    if (!video) {
        return res.status(HttpStatus.NotFound).send(createErrorMessages([{
            field: "id",
            message: `No video found by id: ${id}.`
        }]));
    }
    db.videos.splice(id - 1, 1);
    res.status(HttpStatus.NoContent).send(`Video with id: ${id} was deleted successfully.`);
}