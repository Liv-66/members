const jwt = require("jsonwebtoken");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign(
    { id },
    "process.env.JWT_SECRET"
    //   {
    //     expiresIn: process.env.JWT_EXPIRES_IN,
    //   }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  user.password = undefined;
  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({ status: "success", token, data: { user } });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) return next(new AppError("請輸入E-mail及密碼", 401));
  const user = await User.findOne({ name });

  if (password !== user.password)
    return next(new AppError("密碼錯誤, 請再試一次", 401));

  createSendToken(user, 200, res);
});

exports.isLogedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await jwt.verify(
        req.cookies.jwt,
        "process.env.JWT_SECRET"
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      // Pug => if user
      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    return next();
  }
  next();
};
