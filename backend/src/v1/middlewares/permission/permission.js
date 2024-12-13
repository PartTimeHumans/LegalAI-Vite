import { verify } from "jsonwebtoken";

export default function (request, response, next) {
  const token = request.header("auth-token");
  if (!token) {
    return response.status(401).send("Access Denied");
  }

  try {
    const verified = verify(token, process.env.TOKEN_SECRET);
    request.user = verified;
    next();
  } catch (error) {
    response.status(400).send("Invalid Token");
  }
}
