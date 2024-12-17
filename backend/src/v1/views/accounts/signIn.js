import User from "../../models/Users.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const compare = bcryptjs.compare;
const sign = jsonwebtoken.sign;

/**
 * @desc verify if the user exists and login credentials.
 *       Also generates signed JWT login.
 * @param  string $request - route request
 *         string $response - route response
 * @return returns JWT token
 */
const login = async (request) => {
  try {
    console.log("Dasd");
    const { email, password } = request.body;
    let user = await User.findOne({ email }).select("password");
    if (!user) {
      const error = {
        message: "No user found!",
      };
      return { error };
    }

    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      const error = {
        message: "You have entered an invalid email or password!",
      };
      return { error };
    }

    //? Create and assign a token
    const token = sign({ _id: user._id }, process.env.TOKEN_SECRET);
    const userData = await User.findOne({ email }).select({
      first_name: 1,
      last_name: 1,
      email: 1,
      role: 1,
      address: 1,
      phone: 1,
    });

    console.log(token);
    return { userData, token };
  } catch (e) {
    console.log(e);

    const error = { message: "Internal server error" };
    return { error };
  }
};

export default login;
