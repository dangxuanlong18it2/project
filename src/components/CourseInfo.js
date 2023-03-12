import React, { useState, useEffect } from "react";
import { getCourseInfo } from "../api/API_Courses";
import { getUser, isAdmin, isTeacher } from "../api/Session";
import CancleButton from "./buttons/CancleButton";
import UserAvatar from "./UserAvatar";
import ConfirmButton from "./buttons/ConfirmButton";
import { Link } from "react-router-dom";
function CourseInfo(props) {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    getCourseInfo(props.id, setCourse);
  }, [props.id]);
  return (
    <div className="p-3 shadow rounded-xl bg-white" style={{width:"450px"}}>
      {/* <img
        src={`http://localhost:8000/${course.courseCover}`}
        className="w-96 h-72 object-cover rounded-xl"
      /> */}
      <div className="space-y-3">
        <p className="text-2xl font-bold text-gray-600">{course.courseTitle}</p>
        <div className="flex items-center">
          <UserAvatar link={course.teacherAvatar} />
          <Link
            to={`/profile/${course.teacherId}`}
            className="text-gray-500 text-lg font-medium"
          >
            {course.teacherName}
          </Link>
        </div>
        {/* <p className="text-gray-400">{course.courseIntroduction}</p> */}
      </div>
      <div className="flex justify-center">
        {isAdmin() ? (
          <ConfirmButton type="confirm-course" id={props.id} />
        ) : (
          isTeacher() &&
          getUser().id == course.teacherId &&
          props.full && <CancleButton id={props.id} />
        )}
      </div>
    </div>
  );
}

export default CourseInfo;
