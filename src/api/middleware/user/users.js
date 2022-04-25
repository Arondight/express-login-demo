import mongodb from "#@src/api/lib/mongodb";

function users(req, res) {
  mongodb.models.User.find({})
    .then((user) =>
      res.json({
        success: true,
        message: "success",
        users: user.length > 0 ? user.map((c) => ({ username: c.username, ctime: c.ctime })) : [],
      })
    )
    .catch((err) => res.json({ success: false, message: err }));
}

export default users;
