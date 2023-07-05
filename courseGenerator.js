const fs = require('fs');
const path = require('path');

let sidebar = {
  someSidebar: {
    'Hogwarts': {}
  }
};

function getCourses(directory, filelist = []) {
  fs.readdirSync(directory).forEach(file => {
    const absolutePath = path.join(directory, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      filelist = getCourses(absolutePath, filelist);
    } else {
      filelist.push(path.join(directory, file));
    }
  });

  return filelist;
}

const coursesDirectory = './programme/courses';
const courseFiles = getCourses(coursesDirectory);
const courses = courseFiles.map(file => require(path.join(__dirname, file)));

courses.forEach(courseData => {
  const { course, category } = courseData;

  const courseContent = `---
id: ${course.courseName.replace(' ', '-').toLowerCase()}
title: ${course.courseName}
---

# ${course.courseName}
[Course Link](${course.courseLink})

## Sections
${course.sections.map(section => `- [${section.sectionName}](${section.sectionLink})`).join('\n')}
  `;
  fs.writeFileSync(path.join('./docs', `${course.courseName.replace(' ', '-').toLowerCase()}.md`), courseContent);

  // Creating a directory for the course sections
  const courseDirectory = path.join('./docs', `${course.courseName.replace(' ', '-').toLowerCase()}`);
  if (!fs.existsSync(courseDirectory)) {
    fs.mkdirSync(courseDirectory);
  }

  // Creating md file for each section
  course.sections.forEach(section => {
    const sectionContent = `---
id: ${section.sectionName.replace(' ', '-').toLowerCase()}
title: ${section.sectionName}
---

# ${section.sectionName}
[Section Link](${section.sectionLink})

## Notes
TODO: Add your notes here
    `;

    // Write the section md file into the course's directory
    fs.writeFileSync(path.join(courseDirectory, `${section.sectionName.replace(' ', '-').toLowerCase()}.md`), sectionContent);
  });

  // Updating the sidebar
  if (!sidebar.someSidebar['Hogwarts'][category]) {
    sidebar.someSidebar['Hogwarts'][category] = [];
  }
  sidebar.someSidebar['Hogwarts'][category].push(course.courseName.replace(' ', '-').toLowerCase());
});

// Writing the sidebar structure to the file
fs.writeFileSync('./courseSidebar.js', `module.exports = ${JSON.stringify(sidebar, null, 2)}`);
