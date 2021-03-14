import React, { Fragment } from "react";
import Moment from "react-moment";
const ProfileEducation = ({
  education: { school, fieldOfStudy, degree, current, to, from, description },
}) => {
  return (
    <Fragment>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{from}</Moment> -{" "}
        {!to ? "Now" : <Moment format='YYYY/MM/DD'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of study: </strong>
        {fieldOfStudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </Fragment>
  );
};

export default ProfileEducation;
