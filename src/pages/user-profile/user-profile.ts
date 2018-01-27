import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Project} from "../../classes/Project";
import {User} from "../../classes/User";

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-user-profile',
    templateUrl: 'user-profile.html',
})
export class UserProfilePage {

    receiveObject;
    user: User;
    selectedTab = 'info';
    projectList: Array<Project> = [];
    loading: Loading;

    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {
        this.user = this.navParams.get('userID');

        /// TODO: get user from service
        this.user = {
            name: 'Leon',
            username: 'leonie',
            email: 'leon.leonie@leon.com',
            projectsOwned: 3,
            projectsContributing: 5,
            dateRegistered: '1. 1. 1999',
            profilePicSource: '',
            password: '',
            id: '123'
        }

    }

    tabSwitched(tabName){
        switch(tabName){
            case 'projects':

                /// TODO: mock
                if(this.projectList.length == 0){
                    this.showLoading();

                    for(let i=0; i<6; i++) {
                        this.projectList.push({contributors: [], branches: [], id: 0, title: 'Project ' + i, numberOfContributors: i + 2, description: 'Description of project ' + i,
                            imageSrc: 'https://vignette.wikia.nocookie.net/austinally/images/1/14/Random_picture_of_shark.png/revision/latest?cb=20150911004230'});
                    }

                    this.loading.dismiss();
                }
        }
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
