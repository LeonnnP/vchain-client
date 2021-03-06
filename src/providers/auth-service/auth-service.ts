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
        this.authToken = localStorage.getItem('vch_token');
    }

    // je uporabnik prijavljen?
    loggedIn() {
        this.loadToken();
        return tokenNotExpired('vch_token');
    }

    // dobi podatke o profilu uporabnika
    getProfile(key): Observable<any> {
        this.loadToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.authToken
        });

        return this.http.get('http://' + IPConfig.SERVER_IP + '/users/details/' + key, {headers: headers});
    }

    // avtentificiraj uporabnika
    authenticateUser(username, password): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const user = {
            username: username,
            password: password
        };

        return this.http.post('http://' + IPConfig.SERVER_IP + '/users/authenticate', user, {headers: headers});
    }

    // shranimo token v local storage
    storeUserData(token, user) {
        // id token is where authorization looks at for tolken
        localStorage.setItem('vch_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    registerUser(name, username, email, password): Observable<any> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        const user = {
            name: name,
            username: username,
            email: email,
            password: password
        };

        return this.http.post('http://' + IPConfig.SERVER_IP + '/users/register', user, {headers: headers});
    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }

}
