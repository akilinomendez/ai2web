// i used this  StackMiddleware look guide https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs  and add start
import { stackMiddlewares } from "./middlewares/stackMiddlewares";
import { withAuth } from "./middlewares/withAuth";
import { withError } from "./middlewares/WithError";
import { withHeaders } from "./middlewares/withHeaders";

export default stackMiddlewares([withAuth, withHeaders, withError]);
