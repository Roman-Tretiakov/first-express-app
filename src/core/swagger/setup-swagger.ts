import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express';
import {join} from "node:path";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Video hosting API',
            version: '1.1.0',
            description: 'video API'
        },
        tags: [
            { name: 'Testing', description: 'API for clearing the database' },
            { name: 'Videos', description: 'API for managing videos' }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                    description: 'Base64 encoded username and password',
                }
            }
        },
        security: [{basicAuth: []}]
    },
    apis: [
        join(__dirname, '../videos/docs/testing.swagger.yml'),
        join(__dirname, '../videos/docs/videos.swagger.yml')
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.get('/api-json', (req, res) => {
        res.json(swaggerSpec);
    });

    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};