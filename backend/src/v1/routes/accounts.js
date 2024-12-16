import express from "express";
import register from "../views/accounts/signUp.js";
import login from "../views/accounts/signIn.js";
const router = express.Router();

/**
  * @route Register route
  * @desc register a new user
  * @middleware validate user data
  * @param  string $request - route request
            string $response - route response
  * @return returns response
*/
router.post("/register", async (request, response) => {
  try {
    const { data, error } = await register(request);
    if (error) {
      return response.status(400).send(error);
    } else {
      response.status(201).send({ message: data });
    }
  } catch (error) {
    response.status(500).send({ message: "Internal server error" });
  }
});

/**
  * @route Login route
  * @desc login existing user and generates JWT token
  * @middleware validate login credentials
  * @param  string $request - route request
            string $response - route response
  * @return returns response
*/
router.post("/login", async (request, response) => {
  try {
    const { userData, error } = await login(request, response);  // Pass response to login function
    if (error) {
      return response.status(400).send({ error });
    } else {
      return response.status(200).send({ userData });  // Return user data along with success message
    }
  } catch (e) {
    response.status(500).send({ message: "Internal server error" });
  }
});


export default router;
