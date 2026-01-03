"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const endpoint_list_1 = require("../../constants/endpoint-list");
const http_status_1 = require("../../enums/http-status");
const db_1 = require("../../../db/db");
const error_utils_1 = require("../../utils/error.utils");
const video_input_dto_validation_1 = require("../dto/video-input-dto-validation");
exports.videosRouter = (0, express_1.Router)({});
exports.videosRouter
    // videos crud routes:
    .get("", (req, res) => {
    res.status(http_status_1.HttpStatus.Ok).send(db_1.db.videos);
})
    .get(endpoint_list_1.EndpointList.SINGLE_VIDEO, (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{
                field: "id",
                message: `Invalid video id format: ${req.params.id}.`
            }]));
    }
    const id = parseInt(req.params.id);
    const video = db_1.db.videos.find((video) => video.id === id);
    if (!video) {
        return res.status(http_status_1.HttpStatus.NotFound).send((0, error_utils_1.createErrorMessages)([{
                field: "id",
                message: `No video found by id: ${id}.`
            }]));
    }
    res.status(http_status_1.HttpStatus.Ok).send(video);
})
    .post("", (req, res) => {
    // validate request body:
    if (!req.body) {
        return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{
                field: "body",
                message: "Request body is missing."
            }]));
    }
    else {
        const errors = (0, video_input_dto_validation_1.createVideoInputDtoValidation)(req.body);
        if (errors.length > 0) {
            return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)(errors));
        }
        const newVideo = Object.assign({ id: db_1.db.videos.length > 0 ? db_1.db.videos[db_1.db.videos.length - 1].id + 1 : 1, canBeDownloaded: false, minAgeRestriction: null, createdAt: new Date().toISOString(), publicationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() }, req.body);
        db_1.db.videos.push(newVideo);
        res.status(http_status_1.HttpStatus.Created).send(newVideo);
    }
})
    .put(endpoint_list_1.EndpointList.SINGLE_VIDEO, (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{
                field: "id",
                message: `Invalid video id format: ${req.params.id}.`
            }]));
    }
    // validate request body:
    if (!req.body) {
        return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{
                field: "body",
                message: "Request body is missing."
            }]));
    }
    else {
        const errors = (0, video_input_dto_validation_1.updateVideoInputDtoValidation)(req.body);
        if (errors.length > 0) {
            return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)(errors));
        }
        const id = parseInt(req.params.id);
        const video = db_1.db.videos.find((video) => video.id === id);
        if (!video) {
            return res.status(http_status_1.HttpStatus.NotFound).send(`No video found by id: ${id}.`);
        }
        const newVideo = Object.assign(video, req.body);
        db_1.db.videos[id - 1] = newVideo;
        res.status(http_status_1.HttpStatus.Ok).send(newVideo);
    }
})
    .delete(endpoint_list_1.EndpointList.SINGLE_VIDEO, (req, res) => {
    if (isNaN(parseInt(req.params.id))) {
        return res.status(http_status_1.HttpStatus.BadRequest).send((0, error_utils_1.createErrorMessages)([{
                field: "id",
                message: `Invalid video id format: ${req.params.id}.`
            }]));
    }
    const id = parseInt(req.params.id);
    const video = db_1.db.videos.find((video) => video.id === id);
    if (!video) {
        return res.status(http_status_1.HttpStatus.NotFound).send((0, error_utils_1.createErrorMessages)([{
                field: "id",
                message: `No video found by id: ${id}.`
            }]));
    }
    db_1.db.videos.splice(id - 1, 1);
    res.status(http_status_1.HttpStatus.NoContent).send(`Video with id: ${id} was deleted successfully.`);
});
