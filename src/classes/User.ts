export class User{
    name: string;
    username: string;
    email: string;
    password: string = '';
    profilePicSource: string;
    projectsOwned: number;
    projectsContributing: number;
    dateRegistered: string;
    id: string;

    constructor(id, name, username, email, profilePicSource){
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.profilePicSource = profilePicSource;
    }
}