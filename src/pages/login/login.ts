import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
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
            this.navCtrl.setRoot(TabsPage);
        }
    }

    public login() {
        this.showLoading();
        const user = {
            username: this.username,
            password: this.password
        };

        if (user.username == undefined || user.username.length == 0) {
            this.showError("Please enter an username!");
            return;
        }
        else if (user.password == undefined || user.password.length == 0) {
            this.showError("Please enter a password!");
            return;
        }


        this.authService.authenticateUser(user).subscribe(
            data => {
                if (data.success) {
                    this.authService.storeUserData(data.token, data.user);
                    this.navCtrl.setRoot(TabsPage);
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

}
