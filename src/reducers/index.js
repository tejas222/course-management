import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import categoryReducers from "./categoryReducers";

export default combineReducers({
  errors: errorReducer,
  categories: categoryReducers,
});
