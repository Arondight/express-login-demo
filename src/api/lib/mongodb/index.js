import connect from "#src/api/lib/mongodb/connect";
import User from "#src/api/lib/mongodb/models/user";

export default { connect, models: { User } };
