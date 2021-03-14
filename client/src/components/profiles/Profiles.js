import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
const Profiles = ({ getProfiles, profiles, loading }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Developers</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          {profiles.length === 0 ? (
            <h4>No profiles founded</h4>
          ) : (
            <Fragment>
              <div className='profiles'>
                {profiles.map((profile) => (
                  <ProfileItem profile={profile} />
                ))}
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading,
});
export default connect(mapStateToProps, { getProfiles })(Profiles);
