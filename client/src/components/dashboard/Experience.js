import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";
const Experience = (props) => {
  const experiences = props.experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='yyyy/mm/dd'>{exp.from}</Moment> -{" "}
        {exp.to === null ? "Now" : <Moment format='yyy/mm/dd'>{exp.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => props.deleteExperience(exp._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='hide-sm'>Company</th>
            <th>Position</th>
            <th className='hide-sm'>Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};
export default connect(null, { deleteExperience })(Experience);
