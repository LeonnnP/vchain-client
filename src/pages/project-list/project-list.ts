import {Component, Injector, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, Slides} from 'ionic-angular';
import {Tag} from "../../classes/Tag";
import {Project} from "../../classes/Project";

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
    tags: Array<Tag> = [];
    showLeftButton: boolean;
    showRightButton: boolean;

    projectList: Array<Project> = [];

    loading: Loading;

    constructor(public injector: Injector,  private alertCtrl: AlertController,
                private loadingCtrl: LoadingController) {
    }

    ngOnInit(){

        // mock start
        this.tags.push({arrayIndex: 0, id: 0, name: "test"});
        this.tags.push({arrayIndex: 1, id: 1, name: "test1"});
        this.tags.push({arrayIndex: 2, id: 2, name: "test2"});
        this.tags.push({arrayIndex: 3, id: 3, name: "test3"});
        this.tags.push({arrayIndex: 4, id: 4, name: "test4"});
        // mock end

        this.initializeCategories();

        this.filterData(0);
    }

    private initializeCategories(): void {

        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.tags.length > 3;
    }

    public filterData(categoryId: number): void {

        if(this.selectedTag != undefined && this.selectedTag.name == this.tags[categoryId].name) return;

        this.selectedTag = this.tags[categoryId];

        /// TODO: mock
        this.showLoading();
        this.projectList = [];

        for(let i=0; i<6; i++) {
            this.projectList.push({branches: [], id: 0, title: 'Project ' + i, numberOfContributors: i + 2, description: 'Description of project ' + i, imageSrc: 'https://vignette.wikia.nocookie.net/austinally/images/1/14/Random_picture_of_shark.png/revision/latest?cb=20150911004230'});
        }

        this.loading.dismiss();
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
