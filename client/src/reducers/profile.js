import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileMiddleware = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: state,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileMiddleware;