import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {ProjectAddPage} from "../pages/project-add/project-add";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {ProjectListPage} from "../pages/project-list/project-list";
import {BranchViewPage} from "../pages/branch-view/branch-view"

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;
    pages: Array<{ title: string }>;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthServiceProvider) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.pages = [
            {title: 'Add project'},
            {title: 'Profile'},
            {title: 'Logout'}
        ];
    }

    openPage(page) {
        switch (page) {
            case 'Add project':
                this.nav.push(ProjectAddPage);
                break;

            case 'Profile':
                this.nav.push(UserProfilePage, {userID: JSON.parse(localStorage.getItem('user')).id});
                break;

            case 'Logout':
                this.authService.logout();
                this.nav.setRoot(LoginPage);
                break;
        }
    }
}
