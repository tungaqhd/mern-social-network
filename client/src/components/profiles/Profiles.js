import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
const Profiles = (props) => {
  useEffect(() => {
    props.getProfiles();
  }, []);
  return (
    <Fragment>
      {props.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 class='large text-primary'>Developers</h1>
          <p class='lead'>
            <i class='fab fa-connectdevelop'></i> Browse and connect with
            developers
          </p>
          {props.profiles.length === 0 ? (
            <h4>No profiles founded</h4>
          ) : (
            <Fragment>
              <div class='profiles'>
                {props.profiles.map((profile) => (
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
