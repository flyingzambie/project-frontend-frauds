import express from "express";
import { Airport } from "../../models/index.js";
import { checkSchema, validationResult } from "express-validator";
import { searchSchema } from "../validators/airport.js";
import validateSchema from "../middlewares/validateSchema.js";

const router = express.Router();

// search
router.post(
  "/search",
  checkSchema(searchSchema),
  validateSchema,
  async (req, res) => {
    res.json(await Airport.search(req.body.query, req.body.fields));
  }
);

export default router;