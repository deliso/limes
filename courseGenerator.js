const fs = require("fs");
const path = require("path");

// Read the courses JSON file
const coursesData = require("./curriculum.json");

coursesData.courses.forEach((course) => {
  course.details.sections.forEach((section) => {
    // Construct the content of the markdown file
    const markdownContent = `
# ${section.details.name}

## Key Takeaways

- Key takeaway 1
- Key takeaway 2
- Key takeaway 3

## Why This Is Important

This section is crucial because it introduces {explain the importance of the section here}. Mastery of this concept/topic is a stepping stone to understanding {related advanced topics}.

## Tips to Revisit This Section in the Future

1. **Re-read key points:** Regularly reviewing the key takeaways from this section can help reinforce the material in your mind.
2. **Practical application:** Try to apply the concepts learned in this section in your day-to-day coding tasks or side projects.
3. **Teach others:** One of the best ways to solidify your understanding of a topic is to explain it to someone else.

## Additional Notes

{Any other specific notes or reminders related to the section}

## Resources for Further Learning

- [Resource Name](link) - A brief description of what the resource offers and why it's useful.
- [Resource Name](link) - A brief description of what the resource offers and why it's useful.

`;

    // Define the path for the markdown file
    const dirPath = path.join(
      __dirname,
      "docs",
      `${course.details.slug}`
    );
    const filePath = path.join(dirPath, `${section.details.slug}.md`);

    // Create the directory if it does not exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write the markdown file only if it does not already exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, markdownContent);
    }
  });

  // Construct the content of the welcome.md file
  const welcomeMdContent = 
`---
title: ${course.details.name}
---
import CoursePage from '@site/src/components/CoursePage';

<CoursePage courseid="${course.id}"/>
`;

  // Define the path for the welcome.md file
  const welcomeMdPath = path.join(
    __dirname,
    "docs",
    `${course.details.slug}`,
    "welcome.mdx"
  );

  // Write the welcome.md file
  fs.writeFileSync(welcomeMdPath, welcomeMdContent);
});
