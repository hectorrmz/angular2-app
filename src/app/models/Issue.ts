import { Project } from "./Project";

export interface Issue {
    id: number;
    description: string;
    assigned_to: any;
    author: any;
    project: Project
    status: any;
    subject: string;
    tracker: any;

}