function logged(req, res, next) {
  if (!req.session.user) {
    return res.json({ error: "unlogged", session: false });
  }
  next();
}

function notLogged(req, res, next) {
  if (req.session.user) {
    return res.json({ error: "logged", session: true });
  }
  next();
}

export default { yes: logged, no: notLogged };
