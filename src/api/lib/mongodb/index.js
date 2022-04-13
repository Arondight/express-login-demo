import connect from "#src/api/lib/mongodb/connect";
import disconnect from "#src/api/lib/mongodb/disconnect";
import User from "#src/api/lib/mongodb/models/user";

export default { connect, disconnect, models: { User } };
