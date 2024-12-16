import User from "../../models/Users.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const compare = bcryptjs.compare;
const sign = jsonwebtoken.sign;

const login = async (request) => {
  try {
    const { email, password } = request.body;

    let user = await User.findOne({ email }).select("password role email");

    if (!user) {
      return { error: "no user found with this email" };
    }

    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      return { error: "invalid email or password!" };
    }

    const token = sign(
      {
        _id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const userData = await User.findOne({ email }).select({
      first_name: 1,
      last_name: 1,
      email: 1,
      role: 1,
      address: 1,
      phone: 1,
    });
    console.log("userData:", userData);

    return { userData, token };
  } catch (e) {
    console.error(e);
    return { error: "server error" };
  }
};

export default login;
