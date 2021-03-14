import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_LIKES: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    }
    case ADD_POST: {
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    }
    case ADD_COMMENT: {
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    }
    case REMOVE_COMMENT: {
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter((cmt) => cmt._id !== payload),
        },
      };
    }
    default:
      return state;
  }
};

export default postReducer;
