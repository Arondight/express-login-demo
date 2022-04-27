function get(req, res) {
  res.json({ success: true, message: "session get" });
}

function remove(req, res) {
  delete req.session.username;
  res.json({ success: true, message: "session removed" });
}

export default { get, remove };
