import User from "../models/UserDb";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "Join Account" });
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Username or Email already exists",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join Error",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const exists = await User.exists({ username });
  if (!exists) {
    return res
      .status(400)
      .render("login", {
        pageTitle: "Login",
        errorMessage: "An Accooun with this username does not exists",
      });
  }
  res.end();
};
export const logout = (req, res) => res.send("Logout");

export const editUser = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");

export const see = (req, res) => res.send("See User");
