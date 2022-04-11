import logged from "#src/api/middleware/user/logged";
import login from "#src/api/middleware/user/login";
import register from "#src/api/middleware/user/register";
import remove from "#src/api/middleware/user/remove";
import session from "#src/api/middleware/user/session";
import users from "#src/api/middleware/user/users";

export default { logged, login, register, remove, session, users };
