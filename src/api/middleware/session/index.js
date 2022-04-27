function get(req, res) {
  res.json({ success: true, message: "session get" });
}

function remove(req, res) {
  req.session.destroy();
  res.json({ success: true, message: "session removed" });
}

export default { get, remove };
