import { middleware, roleCheck } from "../../../middlewares/index.js";
import { allCase, getDetail } from "../views/cases/allCases.js";
import express, { Router } from "express";

const router = Router();

router.get(
  "/getAllCase",
  middleware,
  roleCheck("Lawyer"),
  async (request, response) => {
    try {
      const allcase = await allCase(request, response);
      return response.status(200).json(allcase);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/getDetail",
  middleware,
  roleCheck("Lawyer"),
  async (request, response) => {
    try {
      const id = request.query.id;
      const casedetails = await getDetail(id);
      response.status(200).json(casedetails);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }
);

export default router;
