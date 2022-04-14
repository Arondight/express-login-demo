function get(req, res) {
  res.json({ session: true, message: "session get" });
}

function remove(req, res) {
  req.session.user = null;
  res.json({ success: true, message: "session removed" });
}

export default { get, remove };
