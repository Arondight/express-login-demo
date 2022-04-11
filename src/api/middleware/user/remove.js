import sha256 from "crypto-js/sha256.js";
import mongodb from "#src/api/lib/mongodb";

function remove(req, res) {
  if ("string" !== typeof req.body.username) {
    return res.json({ success: false, message: "invalid username" });
  }

  if ("string" !== typeof req.body.password) {
    return res.json({ success: false, message: "invalid password" });
  }

  const password = sha256(req.body.password).toString();

  mongodb.models.User.findOne({ username: req.body.username.toLowerCase() })
    .then((docs) => {
      if (!docs) {
        res.json({ success: false, message: "not found" });
      } else if (password === docs.password) {
        docs.remove((err) => res.json({ success: !err, message: `remove user ${err ? "failed" : "success"}` }));
      } else {
        res.json({ success: false, message: "wrong password" });
      }
    })
    .catch((err) => res.json(err));
}

export default remove;
