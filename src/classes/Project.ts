import {Branch} from "./Branch";
import {User} from "./User";

export class Project {
    id: number;
    title: string;
    description: string;
    numberOfContributors: number;
    imageSrc: string;
    branches: Array<Branch>;
    contributors: Array<User>;
}