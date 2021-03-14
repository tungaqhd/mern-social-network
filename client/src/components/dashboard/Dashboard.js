import React, { Fragment, useEffect } from "react";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Experience from "./Experience";
import Education from "./Education";
import { Link, withRouter } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import { deleteAccount } from "../../actions/profile";
const Dashboard = ({
  getCurrentProfile,
  loading,
  profile,
  deleteAccount,
  history,
  auth,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {auth.user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => deleteAccount(history)}
            >
              <i className='fas fa-user-minus'></i> Delete account
            </button>
          </div>
        </Fragment>
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
  profile: state.profile.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  withRouter(Dashboard)
);
