import { allCase, getDetail } from "../views/cases/allCases.js";
import express, { Router } from "express";

const router = Router();

router.get("/getAllCase", async (request, response) => {
  try {
    const allcase = await allCase(request, response);
    return response.status(200).json(allcase);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

router.get("/getDetail", async (request, response) => {
  try {
    const id = request.query.id;
    console.log(id);
    const casedetials = await getDetail(id);
    console.log(casedetials);
    response.status(200).json(casedetials);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
});

export default router;
