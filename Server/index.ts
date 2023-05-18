import express, { json, Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './build/routes';

dotenv.config();

import db from './db';

const app: Express = express();
const port = process.env.PORT || 3000;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(json());

import * as swaggerDocument from './build/swagger.json';

app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
