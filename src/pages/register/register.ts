import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ProjectListPage} from "../project-list/project-list";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {

    loading: Loading;
    username: String;
    password: String;
    email: String;
    name: String;

    constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    }

    ngOnInit() {
    }

    public register() {
        this.showLoading();
        const user = {
            username: this.username,
            password: this.password,
            email: this.email,
            name: this.name,
        };

        if (user.name == undefined || user.name.length == 0) {
            this.showError("Please enter a name!");
            return;
        }
        else if (user.username == undefined || user.username.length == 0) {
            this.showError("Please enter an username!");
            return;
        }
        else if (user.password == undefined || user.password.length == 0) {
            this.showError("Please enter a password!");
            return;
        }
        else if (user.email == undefined || user.email.length == 0) {
            this.showError("Please enter an email!");
            return;
        }


        this.authService.registerUser(this.name, this.username, this.email, this.password).subscribe(
            data => {
                if (data.success) {
                    this.authService.storeUserData(data.token, data.user);
                    this.navCtrl.pop();
                } else {
                    this.showError("Register failed, try again");
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

}
