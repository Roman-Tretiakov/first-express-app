"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const db_1 = require("../../../db/db");
const http_status_1 = require("../../enums/http-status");
const endpoint_list_1 = require("../../constants/endpoint-list");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete(endpoint_list_1.EndpointList.TEST_DELETE_ALL_VIDEOS, (req, res) => {
    db_1.db.videos = [];
    res.status(http_status_1.HttpStatus.NoContent).send(db_1.db.videos);
});
