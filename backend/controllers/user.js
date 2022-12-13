const { db } = require("../db.js");
const { createError } = require("../error.js");
const User = require("../models/User.js");

const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const listAllUsers = async (req, res) => {
  const {page, limit} = req.query;
  let result = [];
  await db.collection('user')
      .orderBy('name')
      .startAt((parseInt(page) - 1) * 10)
      .limit(parseInt(limit)).get().then((snapshot) => {
      snapshot.forEach(element => {
          result.push(element.data())
      });
  })
  res.send(result)
};

module.exports = {
  update,
  deleteUser,
  getUser,
  listAllUsers
}