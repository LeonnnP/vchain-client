import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {IPConfig} from "../ipconfig";
import {tokenNotExpired} from "angular2-jwt";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

    authToken: any;
    user: any;

    constructor(public http: HttpClient) {
        this.loadToken();
    }

    // dobi token uporabnika
    loadToken() {
        this.authToken = localStorage.getItem('id_token');
    }

    // je uporabnik prijavljen?
    loggedIn() {
        this.loadToken();
        return tokenNotExpired('id_token');
    }

    // dobi podatke o profilu uporabnika
    getProfile() {
        this.loadToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/users/profile', {headers: headers});
    }

    // avtentificiraj uporabnika
    authenticateUser(user): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post('http://' + IPConfig.SERVER_IP + '/users/authenticate', user, {headers: headers});
    }

    // shranimo token v local storage
    storeUserData(token, user) {
        // id token is where authorization looks at for tolken
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

}
