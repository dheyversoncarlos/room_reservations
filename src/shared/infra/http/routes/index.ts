import { roomRouter } from "@modules/rooms/infra/http/routes/room.routes";
import { scheduleRouter } from "@modules/rooms/infra/http/routes/schedule.routes";
import { authRouter } from "@modules/users/infra/http/routes/auth.routes";
import { usersRouter } from "@modules/users/infra/http/routes/users.routes";
import express, { Router } from "express";
import passport from "passport";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "../../../../_docs/swagger.json";

const routes = Router();

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send("");
  }
);
routes.use("/avatar", express.static(`${process.cwd()}/src/tmp/avatar`));
routes.use(
  "/roomimages",
  express.static(`${process.cwd()}/src/tmp/roomimages`)
);

routes.use("/auth", authRouter);
routes.use("/users", usersRouter);
routes.use(
  "/room",
  passport.authenticate("jwt", { session: false }),
  roomRouter
);
routes.use(
  "/schedule",
  passport.authenticate("jwt", { session: false }),
  scheduleRouter
);

export default routes;
