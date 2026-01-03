"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const http_status_1 = require("./core/enums/http-status");
const endpoint_list_1 = require("./core/constants/endpoint-list");
const videos_router_1 = require("./core/videos/routers/videos.router");
const testing_router_1 = require("./core/videos/routers/testing.router");
const setup_swagger_1 = require("./core/swagger/setup-swagger");
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    // base route
    app.get(endpoint_list_1.EndpointList.SLASH_ROUTE, (req, res) => {
        res.status(http_status_1.HttpStatus.Ok).send("Welcome to Video Hosting Service API!");
    });
    // routers
    app.use("/api/videos", videos_router_1.videosRouter);
    app.use("/api/testing", testing_router_1.testingRouter);
    (0, setup_swagger_1.setupSwagger)(app);
};
exports.setupApp = setupApp;
