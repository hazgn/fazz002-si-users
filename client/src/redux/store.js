import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import promiseMiddleware from "redux-promise-middleware";
import reducers from "./reducers";

const logger = createLogger();

export default createStore(
  reducers,
  applyMiddleware(logger, promiseMiddleware)
);
