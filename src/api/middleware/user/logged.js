function hasLogged(req, res, next) {
  if (!req.session.user) {
    return res.json({ success: false, error: "not logged" });
  }
  next();
}

function notLogged(req, res, next) {
  if (req.session.user) {
    return res.json({ success: true, error: "has logged" });
  }
  next();
}

export default { yes: hasLogged, no: notLogged };
