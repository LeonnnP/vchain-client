import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Item, ItemSliding, Loading, LoadingController, NavController,
    NavParams
} from 'ionic-angular';
import {Project} from "../../classes/Project";
import {User} from "../../classes/User";
import {UserProfilePage} from "../user-profile/user-profile";
import {BranchViewPage} from "../branch-view/branch-view";

/**
 * Generated class for the ProjectViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-project-view',
    templateUrl: 'project-view.html',
})
export class ProjectViewPage {

    project: Project;
    loading: Loading;
    activeItemSliding: ItemSliding = null;

    constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {
        this.project = this.navParams.get('project');

        /// TODO: mock
        this.showLoading();
        this.project.branches = [];
        this.project.contributors = [];

        for(let i=0; i<3; i++){
            this.project.branches.push({id: i, name: 'Branch number ' + i})
        }

        for(let i=0; i<12; i++){
            this.project.contributors.push(new User(i, 'User ' + i, 'Username' + i, 'test@mail.com' + i, 'http://laoblogger.com/images/default-profile-picture-5.jpg'))
        }

        this.loading.dismiss();
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

    openOption(itemSlide: ItemSliding, item: Item) {

        if(this.activeItemSliding!==null) //use this if only one active sliding item allowed
            this.closeOption();

        this.activeItemSliding = itemSlide;

        let swipeAmount = 194; //set your required swipe amount
        itemSlide.startSliding(swipeAmount);
        itemSlide.moveSliding(swipeAmount);

        itemSlide.setElementClass('active-options-right', true);
        itemSlide.setElementClass('active-swipe-right', true);

        item.setElementStyle('transition', null);
        item.setElementStyle('transform', 'translate3d(-'+swipeAmount+'px, 0px, 0px)');
    }

    closeOption() {
        if (this.activeItemSliding) {
            this.activeItemSliding.close();
            this.activeItemSliding = null;
        }
    }

    viewProfile(contrib: User){
        this.navCtrl.push(UserProfilePage, {user: contrib})
    }

    viewTree(){
        this.navCtrl.push(BranchViewPage)
    }

}
