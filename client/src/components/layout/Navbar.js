import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
export const Navbar = (props) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{" "}
          <span className='hide-sm'>Dashboard</span>
        </Link>
        <a href='#!' onClick={props.logout}>
          <i className='fas fa-sign-out-alt'></i>{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guessLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!props.loading ? (
        <Fragment>{props.isAuthenticated ? authLinks : guessLinks}</Fragment>
      ) : null}
    </nav>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});
export default connect(mapStateToProps, { logout })(Navbar);
