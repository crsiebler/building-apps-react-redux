import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as courseActions from "../../redux/actions/courseActions";

const CoursesPage = props => {
  const { createCourse, courses } = props;
  const [course, setCourse] = useState({ title: "" });

  const handleChange = event => {
    setCourse({ ...course, title: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    createCourse(course);
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h2>Courses</h2>
      <h3>Add Course</h3>
      <input type="text" onChange={e => handleChange(e)} value={course.title} />
      <input type="submit" value="Save" />
      {courses.map(_course => (
        <div key={_course.title}>{_course.title}</div>
      ))}
    </form>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

const mapStateToProps = ({ courses }) => ({
  courses
});

const mapDispatchToProps = {
  createCourse: courseActions.createCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
