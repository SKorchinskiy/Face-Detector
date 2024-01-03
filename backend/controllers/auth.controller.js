const authService = require("../services/auth.service");

async function signInController(req, res) {
  try {
    const { accessToken } = await authService.signIn(req.body);
    res.cookie("Authentication", accessToken, {
      expires: new Date(Date.now() + 1000000000),
      httpOnly: false,
      maxAge: 1000000000,
      path: "/",
      signed: process.env.JWT_SIGNATURE,
    });

    return res.status(200).json({ data: accessToken });
  } catch (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
}

async function signUpController(req, res) {
  try {
    const { message } = await authService.signUp(req.body);
    return res.status(201).json({ message });
  } catch (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
}

module.exports = {
  signInController,
  signUpController,
};
