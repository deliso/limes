import Link from '@docusaurus/Link';
import curriculum from '../../../curriculum.json';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from '@site/dto/Course.dto';
import { Section } from '@site/dto/Section.dto';

interface CourseParams {
  slug: string;
}

interface Props {
  courseid?: number;
}

export default function CoursePage(props: Props) {
  const { courseid } = props;
  const { slug } = useParams<CourseParams>();
  const [course, setCourse] = useState<Course | undefined>();

  useEffect(() => {
    // Find the course that matches the slug in the URL.
    const course = courseid ? curriculum.courses.find(course => course.id === Number(courseid)) as Course : curriculum.courses.find(course => course.details.slug === slug) as Course;
    // If there's no match, this will be undefined.
    setCourse(course);
  }, [slug, courseid]);

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div>
      <div>
      {course.details.sections.map((section: Section) => (
        <li key={section.id}>
          <Link to={`${section.details.slug}`}>
            {section.details.name}
          </Link>
        </li>
      ))}
    </div>
    </div>
  );
}
