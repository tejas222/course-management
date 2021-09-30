import {
  GET_CATEGORY,
  DELETE_CATEGORY,
  GET_ERRORS,
  CATEGORY,
  UPDATE_CATEGORY,
} from "../actions/types";

const initialstate = {
  categories: [],
  category: {},
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };

    case DELETE_CATEGORY:
      return {
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    case CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
}
