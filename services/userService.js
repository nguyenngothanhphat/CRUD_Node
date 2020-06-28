const bcrypt = require("bcrypt");
const database = require("../database");
const { User } = require("../database/index.js");
const { Profile } = require("../database/index.js");

const register = async (
  username,
  password,
  firstName,
  lastName,
  email,
  phone,
  address
) => {
  try {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return err;
      }
      return database.sequelize.transaction(async (t) => {
        const registerUser = await User.create(
          {
            username: username,
            password: hash,
          },
          { transaction: t }
        ).then((res) => res.toJSON());

        const { userId } = registerUser;
        await Profile.create(
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            userId: userId,
          },
          { transaction: t }
        ).then((res) => res.toJSON());
        return registerUser;
      });
    });
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const login = async (username, password) => {};

module.exports = {
  register,
  login,
};
