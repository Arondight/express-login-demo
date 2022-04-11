import sha256 from "crypto-js/sha256.js";
import mongodb from "#@src/api/lib/mongodb";

function register(req, res) {
  if ("string" !== typeof req.body.username) {
    return res.json({ success: false, message: "invalid username" });
  }

  if ("string" !== typeof req.body.password) {
    return res.json({ success: false, message: "invalid password" });
  }

  const instance = new mongodb.models.User();

  instance.username = req.body.username.toLowerCase();
  instance.password = sha256(req.body.password).toString();
  instance.ctime = instance._id.getTimestamp();

  mongodb.models.User.findOne({ username: instance.username })
    .then((docs) => {
      if (docs) {
        res.json({ success: false, message: "already registered" });
      } else {
        instance.save((err) => res.json({ success: !err, message: `register ${err ? "failed" : "success"}` }));
      }
    })
    .catch((err) => res.json({ success: false, message: err }));
}

export default register;
