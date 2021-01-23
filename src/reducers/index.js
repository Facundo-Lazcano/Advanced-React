import { combineReducers } from "redux";
import jobs from "./jobs_reducer";
import likes from "./likes_reducer";

export default combineReducers({
  auth: () => {
    return {};
  },
  jobs,
  likes,
});
