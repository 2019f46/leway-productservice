import app from "./app";
import * as cors from "cors";
import { connect, connection } from "mongoose";

const PORT = process.env.PORT || 3001;

// Enable cors
app.use(cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: "sessionId",
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    preflightContinue: false
  }));

// DB Setup
const dbName = "wayfinder";
const dbUser = "backend";
const dbPassword = "elBackend1";
const dbUrl = `mongodb://${dbUser}:${dbPassword}@ds163835.mlab.com:63835/${dbName}`;

// Connect to the db
connect(dbUrl, { useNewUrlParser: true });

connection.once("open", () => {
    console.log("Connection has been established")
});

// Listen on port
app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
