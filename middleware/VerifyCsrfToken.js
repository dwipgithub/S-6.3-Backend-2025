export const verifyCsrfToken = (req, res, next) => {
  const csrfTokenFromClient = req.headers["xsrf-token"];
  const csrfTokenFromCookie = req.cookies["XSRF-TOKEN"];
  const arrayCSRFToken = [
    csrfTokenFromCookie,
    "d1a7b3c2-97d8-4d49-b4f3-e2f3d8765470",
  ];

  // console.log(csrfTokenFromClient);
  // console.log(csrfTokenFromCookie);
  // console.log(arrayCSRFToken);

  if (!csrfTokenFromClient || !arrayCSRFToken.includes(csrfTokenFromClient)) {
    res.status(403).send({
      status: false,
      message: "CSRF token gagal validasi",
    });
    return;
  }
  next();
};
