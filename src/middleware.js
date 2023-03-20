import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Tube";
  console.log(res.locals);
  res.locals.loggedInUser = req.session.user || {};
  console.log(res.locals);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 300000 },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});

/**
 * @function : Github로 로그인하지 않은 사람들을 위한 Middleware
 */
