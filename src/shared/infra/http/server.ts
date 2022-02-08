import "reflect-metadata";
import "express-async-errors";

import { passportEnsure } from "@modules/users/infra/http/middlewares/passportEnsure";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import passport from "passport";

import { AppError } from "@shared/errors/AppErrors";

import "../../container";
import "../typeorm";

import routes from "./routes";

dotenv.config();

passportEnsure(passport);

const HOST_API = process.env.HOST_API || "localhost";
const PORT_API = Number(process.env.PORT_API) || 3333;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: err.message,
  });
});

app.listen(PORT_API, HOST_API, () => {
  console.log(`Sever api listen on http://${HOST_API}:${PORT_API}`);
});
