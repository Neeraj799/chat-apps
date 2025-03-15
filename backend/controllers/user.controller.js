import User from "../models/user.model.js";

const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUser = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    return res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsersForSidebar };
