import app from "./app";
import * as cors from "cors";
import { connect, connection } from "mongoose";

const PORT = process.env.PORT || 3000;

// Enable cors - default (any) till we know where it will be hosted
app.use(cors());

// DB Setup
// TODO Should be environment specific!
const dbName = "leway-mapdb";
const dbPrimKey =
    "Ih5yMcG8nZXSbYYegjbb5VcxAhnPraTdTBueLj5Lkr47bhf3E0ZTM4pbkh7ITlj2lgHoxyHRQe4b8cBrPkevkQ==";
const dbUrl =
    `mongodb://${dbName}:${dbPrimKey}@${dbName}.documents.azure.com:10250/mean?ssl=true&sslverifycertificate=false`;

// Connect to the db
connect(dbUrl, { useNewUrlParser: true });

connection.once("open", () => {
    console.log("Connection has been established")
});

// Listen on port
app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});
