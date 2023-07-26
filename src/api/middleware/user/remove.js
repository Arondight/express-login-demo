import mongodb from "#@src/api/lib/mongodb";

function remove(req, res) {
  if ("string" !== typeof req.body.username) {
    return res.json({ success: false, message: "invalid username" });
  }

  mongodb.models.User.findOne({ username: req.body.username.toLowerCase() })
    .then((docs) => {
      if (!docs) {
        return res.json({ success: false, message: "not found" });
      }

      docs
        .deleteOne()
        .then(() => res.json({ success: true, message: "remove user success" }))
        .catch(() => res.json({ success: false, message: "remove user failed" }));
    })
    .catch((err) => res.json({ success: false, message: err }));
}

export default remove;
