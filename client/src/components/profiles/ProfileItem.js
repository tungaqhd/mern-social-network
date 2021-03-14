import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const ProfileItem = (props) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={props.profile.user.avatar} alt='' />
        <div>
          <h2>{props.profile.user.name}</h2>
          <p>
            {props.profile.status}{" "}
            {props.profile.company ? (
              <Fragment> at {props.profile.company}</Fragment>
            ) : null}
          </p>
          <p className='my-1'>{props.profile.location}</p>
          <Link
            to={"/profile/" + props.profile.user._id}
            className='btn btn-primary'
          >
            View Profile
          </Link>
        </div>

        <ul>
          {props.profile.skills.slice(0, 4).map((skill, ind) => (
            <Fragment>
              <li key={ind} className='text-primary'>
                <i className='fas fa-check'></i> {skill}
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default ProfileItem;
