import mongodb from "#@src/api/lib/mongodb";

function remove(req, res) {
  if ("string" !== typeof req.body.username) {
    return res.json({ success: false, message: "invalid username" });
  }

  mongodb.models.User.findOne({ username: req.body.username.toLowerCase() })
    .then((docs) => {
      if (!docs) {
        res.json({ success: false, message: "not found" });
        return;
      }

      docs.remove((err) => res.json({ success: !err, message: `remove user ${err ? "failed" : "success"}` }));
    })
    .catch((err) => res.json(err));
}

export default remove;
