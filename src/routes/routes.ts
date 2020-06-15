import jsonResponder from "../classes/jsonResponder";
import Express, { NextFunction } from "express";
import { allowOrigins } from "../helpers/allowOrigins";
import contactRouter from "./contact";

export const routes = Express.Router();
const bodyParser = require("body-parser");
const settings = require("../settings");

routes
  .use(allowOrigins)
  .use(bodyParser.json({ limit: settings.server.bodySizeLimit }))
  .use((error: Error, req: Express.Request, res: Express.Response, next: NextFunction) => {
    return res.status(400).json(jsonResponder.fail(null, "bad json format"));
  })
  .use("/contact", contactRouter)
  .use((error: Error, req: Express.Request, res: Express.Response, next: NextFunction) => {
    if (error) {
      console.error(error);
      return res.status(404).send(jsonResponder.success({ url: req.originalUrl }, 'Resource not found'));
    }
    return next();
  });


export default routes;