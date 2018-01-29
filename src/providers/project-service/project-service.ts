import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IPConfig} from "../ipconfig";
import {Observable} from "rxjs/Observable";
import {AuthServiceProvider} from "../auth-service/auth-service";

/*
  Generated class for the ProjectServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectServiceProvider {

  constructor(public http: HttpClient, private authService: AuthServiceProvider) {
  }


    blobToFile(theBlob: Blob, fileName: string): File {
        var b: any = theBlob;
        //Blobu moramo dodati samo še ime in last modified, da postane file
        b.lastModifiedDate = new Date();
        b.name = fileName;

        var file = new File([theBlob], "name");

        //Moram še castat v file
        return <File>theBlob;
    }


    addVideoRoot(title, tagkey, description, picture, video) {
        this.authService.loadToken();
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': this.authService.authToken
        });

        const formData: FormData = new FormData();
        formData.append('image', picture, picture.name);
        formData.append('video', video, video.name);
        formData.append('tagkey', tagkey);
        formData.append('description', description);
        formData.append('title', title);

        return this.http.post('http://' + IPConfig.SERVER_IP + '/videos/new', formData, {headers: headers});
    }

    getTags(): Observable<any> {
        this.authService.loadToken();
        console.log(this.authService.authToken);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authService.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/videos/getalltags', {headers: headers});
    }

    getVideoByTag(tagKey): Observable<any> {
        this.authService.loadToken();
        console.log(this.authService.authToken);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authService.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/videos/bytagkey/' + tagKey, {headers: headers});
    }

    getProjectContributors(key): Observable<any> {
        this.authService.loadToken();
        console.log(this.authService.authToken);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authService.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/videos/getprojectcontributors/' + key, {headers: headers});
    }

    getProjectLeaves(key): Observable<any> {
        this.authService.loadToken();
        console.log(this.authService.authToken);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authService.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/videos/getleaves/' + key, {headers: headers});
    }

    getProjectVideos(key): Observable<any> {
        this.authService.loadToken();
        console.log(this.authService.authToken);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authService.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/videos/fullvideo/' + key, {headers: headers});
    }

    appendToVideo(key, video, title): Observable<any> {
        this.authService.loadToken();
        const headers = new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': this.authService.authToken
        });

        const formData: FormData = new FormData();
        formData.append('parent', key);
        formData.append('video', video, video.name);
        formData.append('title', title);

        return this.http.post('http://' + IPConfig.SERVER_IP + '/videos/append', formData, {headers: headers});
    }

}
