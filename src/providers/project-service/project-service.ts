import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IPConfig} from "../ipconfig";

/*
  Generated class for the ProjectServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProjectServiceProvider Provider');
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


    addPicture(title, picture) {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');

        const formData: FormData = new FormData();
        formData.append('picture', picture, picture.name);

        formData.append('title', title);
        return this.http.post('http://' + IPConfig.SERVER_IP + '/users/video', formData, {headers: headers});
    }

}
