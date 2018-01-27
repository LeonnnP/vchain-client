import {Component} from '@angular/core';
import {
    AlertController, IonicPage, Item, ItemSliding, Loading, LoadingController, NavController,
    NavParams
} from 'ionic-angular';
import {Project} from "../../classes/Project";

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

        for(let i=0; i<3; i++){
            this.project.branches.push({id: 0, name: 'Branch number ' + i})
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
        console.log('opening item slide..');

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
        console.log('closing item slide..');

        if (this.activeItemSliding) {
            this.activeItemSliding.close();
            this.activeItemSliding = null;
        }
    }

}
