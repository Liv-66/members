exports.login = (req, res) => {
  res.status(200).render("login", {
    title: "Log In",
  });
};

exports.getMe = (req, res) => {
  const { user } = res.locals;
  res.status(200).render("account", {
    title: "Account",
    user,
  });
};
