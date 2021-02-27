import React, { useEffect } from "react";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";
const Dashboard = (props) => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);
  return <div>Dashboard</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
