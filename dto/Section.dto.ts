import { Status } from "./Status.enum";

export type SectionDetails = {
    slug: string;
    name: string;
    status?: "not_started" | "skipped" | "in_progress" | "completed"
}

export type Section = {
    id: number;
    details: SectionDetails;
}
