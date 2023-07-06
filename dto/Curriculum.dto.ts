import { Course } from "./Course.dto"

export type Curriculum = {
    name: string,
    version: number,
    courses: Course[]
}