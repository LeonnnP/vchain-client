import {Component, Injector, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, Slides} from 'ionic-angular';
import {Tag} from "../../classes/Tag";
import {Project} from "../../classes/Project";
import {ProjectServiceProvider} from "../../providers/project-service/project-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the ProjectListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {

    @ViewChild(Slides) slides: Slides;

    selectedTag: Tag;
    tags = [];
    showLeftButton: boolean;
    showRightButton: boolean;

    projectList = [];

    loading: Loading;

    constructor(private projectService: ProjectServiceProvider, public injector: Injector,  private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {
    }

    ngOnInit(){

        this.projectService.getTags().subscribe(
            data => {
                if (data.success) {
                    this.tags = data.result;
                    for(let i=0; i<this.tags.length; i++){
                        this.tags[i].arrayIndex = i;
                    }

                    this.initializeCategories();
                    this.filterData(0);
                } else {
                    console.log("User profile failed to load!");
                }
            },
            error2 => {
                console.log("Error connecting to server!");
            });
    }

    private initializeCategories(): void {

        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.tags.length > 3;
    }

    public filterData(categoryId: number): void {

        if(this.selectedTag != undefined && this.selectedTag.name == this.tags[categoryId].name) return;

        this.selectedTag = this.tags[categoryId];
        this.projectService.getVideoByTag(this.selectedTag._key).subscribe(
            data => {
                if (data.success) {
                    this.projectList = [];
                    this.projectList = data.result;
                    console.log(this.projectList)
                } else {
                    this.showError("User profile failed to load!");
                }
            },
            error2 => {
                this.showError("Error connecting to server!");
            });
    }

    // Method executed when the slides are changed
    public slideChanged(): void {
        let currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    }

    // Method that shows the next slide
    public slideNext(): void {
        this.slides.slideNext();
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.slides.slidePrev();
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
