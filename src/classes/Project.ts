import {Branch} from "./Branch";

export class Project {
    id: number;
    title: string;
    description: string;
    numberOfContributors: number;
    imageSrc: string;
    branches: Array<Branch>
}