import {Request, Response} from "express";
import {HttpStatus} from "../../../enums/http-status";
import {videosRepository} from "../../repositories/videos.repository";

export const getVideoListHandler =
(req:Request, res:Response) => {
    res.status(HttpStatus.Ok).send(videosRepository.findAll());
};