import User from "../../models/Users.js";
import encrypt from "../../utils/encryption/encrypt.js";

/**
 * @desc create new user and saves to MongoDB
 * @param  string $request - route request
 * @return returns saved user data
 */
const register = async (request) => {
  let user = await User.findOne({
    email: request.body.email,
  });
  if (user) {
    if (user.email === request.body.email) {
      const error = { message: "Email already exists" };
      return { error };
    }
  } else {
    try {
      const user = new User({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        password: await encrypt(request.body.password),
        role: request.body.role,
        address: request.body.address,
        phone: request.body.phone,
        secondary_phone: request.body.secondary_phone,
        father_name: request.body.father_name,
        mother_name: request.body.mother_name,
        gender: request.body.gender,
        DOB: request.body.DOB,
        nationality: request.body.nationality,
        caste: request.body.caste,
        occupation: request.body.occupation,
      });
      user.save();

      let data = "User Created Successfully";
      return { data };
    } catch (e) {
      const error = { message: "Internal server error" };
      return { error };
    }
  }
};

export default register;
