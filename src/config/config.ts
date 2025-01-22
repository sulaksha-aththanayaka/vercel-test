import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

// Load environment variables
dotenv.config();

const APPLICATIONS = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "",
  API_ENDPOINT: process.env.API_ENDPOINT || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  CLOUD_NAME: process.env.CLOUD_NAME || "",
  CLOUD_KEY: process.env.CLOUD_KEY || "",
  CLOUD_KEY_SECRET: process.env.CLOUD_KEY_SECRET || "",
  CLOUDINARY_IMAGE_BASE_URL: process.env.CLOUDINARY_IMAGE_BASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "",
};

const SWAGGER = {
  DEFINITION: (version?: string) => ({
    openapi: "3.0.0",
    info: {
      title: `30 Island API v${version || "1.0.0"}`,
      version: version || "1.0.0",
      description: "Endpoints to test the routes",
    },
    servers: [
      {
        url: `${APPLICATIONS.API_ENDPOINT}/api/v1`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {},
    },
    security: [{ bearerAuth: [] }],
  }),
  APIS: {
    V1: ["user-management"],
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: APPLICATIONS.CLOUD_NAME,
  api_key: APPLICATIONS.CLOUD_KEY,
  api_secret: APPLICATIONS.CLOUD_KEY_SECRET,
});

export { APPLICATIONS, SWAGGER, cloudinary };
