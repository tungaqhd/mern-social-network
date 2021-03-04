import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";
const Education = (props) => {
  const educations = props.education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='yyyy/mm/dd'>{edu.from}</Moment> -{" "}
        {edu.to === null ? "Now" : <Moment format='yyy/mm/dd'>{edu.to}</Moment>}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => props.deleteEducation(edu._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th className='hide-sm'>School</th>
            <th>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};
export default connect(null, { deleteEducation })(Education);
