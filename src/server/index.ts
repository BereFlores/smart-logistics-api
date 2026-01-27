import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import networkRouter from "./routes/network.js";
import routeRouter from "./routes/route.js";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Routers
app.use("/network", networkRouter);
app.use("/route", routeRouter);

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Route Optimization API", version: "1.0.0" }
  },
  apis: ["./src/server/routes/*.ts"]
};
const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
