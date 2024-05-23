import User from "../models/user.js";

export const makeAuthor = async (req, res) => {
  try {
    let updated = await User.findByIdAndUpdate(
      req.auth._id,
      {
        $addToSet: { role: "Author" },
      },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error occured. Try again.");
  }
};

export const currentAuthor = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();

  if (!user.role.includes("Author")) {
    res.sendStatus(403);
  } else {
    res.json({ ok: true });
  }
};
