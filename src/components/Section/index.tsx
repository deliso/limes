import { Section } from '@site/dto/Section.dto';
import React from 'react';

interface Props {
    section: Section;
  }

const SectionPage = (props: Props) => {
    const { section } = props;
    return (
        <div>
            <h1>{section.details.name}</h1>
            <p>Status: {section.details.status}</p>
        </div>
    );
};

export default SectionPage;
