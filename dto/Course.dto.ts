import { Section } from "./Section.dto";
import { Status } from "./Status.enum";

export interface CourseDetails {
    link: string;
    slug: string;
    name: string;
    category: string;
    sections: Section[];
    version?: string;
    prerequisites?: number[];
    topics?: string[];
    notes?: string;
    discussionLink?: string;
    status: "not_started" | "skipped" | "in_progress" | "completed"
  }

export type Course = {
    id: number;
    details: CourseDetails;
}
