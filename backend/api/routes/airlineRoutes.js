import express from "express";
import { Airline } from "../../models/index.js";
import { checkSchema } from "express-validator";
import { searchValidator } from "../validators/index.js";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// search
router.post(
  "/search",
  checkSchema(searchValidator),
  validateSchema,
  asyncHandler(async ({ body, query }, res) => {
    res.json(
      await Airline.search(body.query, body.include, body.exclude, query.limit)
    );
  })
);

export default router;
