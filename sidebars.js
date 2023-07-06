const coursesData = require('./curriculum.json');

const courses = coursesData.courses;

let courseSidebar = {};

// Define the sidebar structure
const sidebarStructure = [];

// Add the Curriculum item
sidebarStructure.push('intro'); // Curriculum points to 'intro' doc

courses.forEach((course) => {
  // Create an array for the course, starting with 'welcome' entry
  const courseItems = [{type: 'doc', id: `${course.details.slug}/welcome`, label: 'Welcome'}];

  // Add sections to the course array
  const sectionItems = course.details.sections.map(
    (section) => `${course.details.slug}/${section.details.slug}`
  );
  courseItems.push(...sectionItems);

  // Add the course array to the courseSidebar object
  courseSidebar[course.details.name] = courseItems;
});

// Add the courses categories
sidebarStructure.push(courseSidebar);

module.exports = {
  courseSidebar: sidebarStructure,
};
