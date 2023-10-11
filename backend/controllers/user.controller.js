const userService = require("../services/user.service");

async function currentUserStats(req, res) {
  try {
    const stats = await userService.getUserStats({ id: req.user.id });
    return res.status(200).json({ data: stats });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await userService.getUserById({ id: req.user.id });
    return res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

module.exports = {
  currentUserStats,
  getCurrentUser,
};
