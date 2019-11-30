import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import CourseList from "./CourseList";

const CoursesPage = ({
  loading,
  courses,
  authors,
  loadCourses,
  loadAuthors,
  deleteCourse
}) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  const handleDeleteCourse = course => {
    toast.success("Course deleted");
    deleteCourse(course).catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CourseList courses={courses} onDeleteClick={handleDeleteCourse} />
        </>
      )}
    </>
  );
};

CoursesPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired
};

const mapStateToProps = ({ apiCallsInProgress, courses, authors }) => ({
  loading: apiCallsInProgress > 0,
  courses:
    authors.length === 0
      ? []
      : courses.map(course => {
          return {
            ...course,
            authorName: authors.find(a => a.id === course.authorId).name
          };
        }),
  authors
});

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
