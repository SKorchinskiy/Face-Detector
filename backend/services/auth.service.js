const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("../configs/mysql.config");
const userService = require("../services/user.service");

async function signUp({ name, username, email, password }) {
  const exists = await userService.checkUserExistsByEmail({ email });
  if (exists) {
    throw new Error("User with provided email already exists!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const [isRegistered] = await mysql("users").insert({
    name,
    username,
    email,
    password: hashedPassword,
  });
  return { success: isRegistered, message: "registered!" };
}

async function signIn({ email, password }) {
  const [user] = await mysql("users").where({
    email,
  });
  if (!user) {
    throw new Error(`Provided credentials don't match`);
  }
  const arePasswordsEqual = await bcrypt.compare(password, user.password);
  if (!arePasswordsEqual) {
    throw new Error(`Provided credentials don't match`);
  }
  return getAccessToken({ id: user.id, email: user.email });
}

function getAccessToken(payload) {
  const expiration = Number.parseInt(process.env.JWT_EXPIRATION);
  const accessToken = jwt.sign(payload, process.env.JWT_SIGNATURE, {
    expiresIn: `${expiration}s`,
  });
  return {
    accessToken,
    expiresIn: expiration,
  };
}

module.exports = {
  signUp,
  signIn,
};
