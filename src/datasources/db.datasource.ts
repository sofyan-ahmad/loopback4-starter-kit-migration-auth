// import * as path from "path";
import { DataSourceConstructor } from "@loopback/repository";
// import * as DS from "../../../config/datasources.local.js";

// import { config } from 'shelljs';

// const dsConfigPath = path.resolve("config", "datasources.json");
// const config = JSON.parse(fs.readFileSync(dsConfigPath, 'utf8'));

export const db = new DataSourceConstructor({
  host: process.env.LB4_DB_HOST || "localhost",
  port: process.env.LB4_DB_PORT || 5432,
  database: process.env.LB4_DB_NAME || "lb4",
  user: process.env.LB4_DB_USER,
  password: process.env.LB4_DB_PASSWORD,
  name: "mainDS",
  connector: "postgresql"
});
