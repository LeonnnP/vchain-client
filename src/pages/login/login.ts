import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProjectListPage} from "../project-list/project-list";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {RegisterPage} from "../register/register";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    loading: Loading;
    username: String;
    password: String;

    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    }

    ngOnInit() {

        if (this.authService.loggedIn()) {
            this.navCtrl.setRoot(ProjectListPage);
        }
    }

    public login() {

        this.showLoading();

        if (this.username == undefined || this.username.length == 0) {
            this.showError("Please enter an username!");
            return;
        }
        else if (this.password == undefined || this.password.length == 0) {
            this.showError("Please enter a password!");
            return;
        }


        this.authService.authenticateUser(this.username, this.password).subscribe(
            data => {
                if (data.success) {
                    this.authService.storeUserData(data.token, data.user);
                    this.navCtrl.setRoot(ProjectListPage);
                } else {
                    this.showError("Login failed, try again");
                }
            },
            error2 => {
                this.showError("Error connecting to server!");
            });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: text,
            buttons: ['OK']
        });

        alert.present(prompt);
    }

    register() {
        this.navCtrl.push(RegisterPage);
    }

}
