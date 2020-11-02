const { promisify } = require("util");
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
    job: req.body.job,
    address: req.body.address,
    education: req.body.education,
    phone: req.body.phone,
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

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError("請登入", 401));

  const decoded = await promisify(jwt.verify)(token, "process.env.JWT_SECRET");
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError("查無資料", 401));

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.updade = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
});
