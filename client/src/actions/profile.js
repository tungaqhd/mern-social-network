import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createProfile = (profile, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(profile);
    const res = await axios.post("/api/profile", body, config);
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(
        edit ? "Profile has been updated" : "Profile has been created",
        "success"
      )
    );
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
  }
};

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.put("/api/profile/experience", body, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience has been created", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
  }
};

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.put("/api/profile/education", body, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education has been created", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
  }
};

export const deleteExperience = (expId) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile/experience/" + expId);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Experience deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
  }
};

export const deleteEducation = (eduId) => async (dispatch) => {
  try {
    const res = await axios.delete("/api/profile/education/" + eduId);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Education deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
  }
};

export const deleteAccount = (history) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      const res = await axios.delete("/api/profile");
      dispatch({
        type: CLEAR_PROFILE,
      });
      history.push("/");
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Account deleted", "success"));
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      }
    }
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile/");

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/user/" + userId);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getGithubRepos = (gitUsername) => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/user/" + gitUsername);

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
