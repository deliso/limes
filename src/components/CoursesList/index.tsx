import React, { useState, useEffect } from 'react';
import curriculum from '../../../curriculum.json';
import CoursePage from '../CoursePage';
import { Course } from '@site/dto/Course.dto';
import { Curriculum } from '@site/dto/Curriculum.dto';
import Link from '@docusaurus/Link';

function CoursesList() {
  const courseData = curriculum as Curriculum;
  const [courses, setCourses] = useState<Course[] |undefined>([]);

  useEffect(() => {
    setCourses(courseData.courses);
  }, []);

  return (
    <div>
      {courses.map((course) => (
        <li key={course.id}>
          <Link to={`${course.details.slug}/welcome`}>
            {course.details.name}
          </Link>
        </li>
      ))}
    </div>
  );
}

export default CoursesList;
