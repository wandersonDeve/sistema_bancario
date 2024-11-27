import * as dotenv from "dotenv";
import { join } from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config();

export const postgresConfig: DataSourceOptions = {
  type: "postgres",
  url: process.env.TYPEORM_URL,
  ssl:
    process.env.TYPEORM_SSL_MODE === "true" ? { rejectUnauthorized: false } : false,
  entities: [join(__dirname, "/../**/*.entity{.ts,.js}")],
  migrations: [join(__dirname, "/../**/migrations/*{.ts,.js}")],
  migrationsRun: true,
  synchronize: false,
};

export const AppDataSource = new DataSource({
  ...postgresConfig,
});
