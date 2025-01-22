import express from "express";
import { APPLICATIONS, SWAGGER } from "./src/config/config";
import morgan from "morgan";
import dbConnection from "./src/config/db";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from 'swagger-jsdoc';
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./src/routes";
import logRequest from "./src/middlewares/logger.middleware";
import corsOptions from "./src/config/corsOptions";
import credentials from "./src/middlewares/credentials.middleware";

const PORT = APPLICATIONS.PORT || 8080;
const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
const definition = SWAGGER.DEFINITION
const apis = SWAGGER.APIS
const options = {
  definition: definition("V1"),
  apis: [...apis['V1'].map((api => `./src/swagger/${api}/*.yaml`)), './src/swagger/*.yaml']
}
const swaggerDocument = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {}));
app.use(logRequest);
app.use("/api/v1", router);
dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
