import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => {
  return !loading ? (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    ></Route>
  ) : null;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, null)(PrivateRoute);
