import React, { Fragment, useEffect } from "react";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  return props.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {props.auth.user.name}
      </p>
      {props.profile.profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          You have not setup a profile, please add some info.
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.profile.loading,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
