import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Item, ItemSliding, Loading, LoadingController, NavController,
    NavParams
} from 'ionic-angular';
import {Project} from "../../classes/Project";
import {User} from "../../classes/User";
import {UserProfilePage} from "../user-profile/user-profile";
import {BranchViewPage} from "../branch-view/branch-view";
import {IPConfig} from "../../providers/ipconfig";
import {ProjectServiceProvider} from "../../providers/project-service/project-service";
import {VideoViewPage} from "../video-view/video-view";
import {ProjectAddPage} from "../project-add/project-add";

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

    project;
    loading: Loading;
    activeItemSliding: ItemSliding = null;
    ip: string;

    constructor(private projectService: ProjectServiceProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {
        this.project = this.navParams.get('project');

        this.ip = IPConfig.SERVER_IP;

        this.project.branches = [];
        this.project.contributors = [];

        this.projectService.getProjectContributors(this.project._key).subscribe(
            data => {
                if (data.success) {
                    this.project.contributors = data.result;
                } else {
                    this.showError("User profile failed to load!");
                }
            },
            error2 => {
                this.showError("Error connecting to server!");
            });

        this.projectService.getProjectLeaves(this.project._key).subscribe(
            data => {
                if (data.success) {
                    this.project.branches = data.result;
                } else {
                    this.showError("User profile failed to load!");
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

    openVideoView(key){
        this.navCtrl.push(VideoViewPage, {projectID: key})
    }

    contrib(key){
        this.navCtrl.push(ProjectAddPage, {contribKey: key})
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
