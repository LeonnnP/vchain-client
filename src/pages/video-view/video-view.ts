import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProjectServiceProvider} from "../../providers/project-service/project-service";
import {IPConfig} from "../../providers/ipconfig";

/**
 * Generated class for the VideoViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-video-view',
    templateUrl: 'video-view.html',
})
export class VideoViewPage {

    projectID;
    linkList = [];
    counter = 0;
    @ViewChild('myvideo') myVideo: any;
    sources = ['https://raw.githubusercontent.com/mediaelement/mediaelement-files/master/big_buck_bunny.mp4']

    constructor(private projectService: ProjectServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.projectID = this.navParams.get('projectID');
    }

    ngOnInit() {

        this.projectService.getProjectVideos(this.projectID).subscribe(
            data => {
                if (data.success) {
                    this.linkList = data.result;
                    let self = this;
                    var video = this.myVideo.nativeElement;
                    self.counter = this.linkList.length - 1;
                    video.src = 'http://' + IPConfig.SERVER_IP + '/' + self.linkList[self.counter];
                    video.play();

                    this.projectService.getFile(self.linkList[self.counter].substring(self.linkList[self.counter].indexOf('videos/') + 'videos/'.length, self.linkList[self.counter].length)).subscribe(data => {
                        console.log(data);
                    });

                    video.addEventListener('ended', function (e) {
                        self.counter = self.counter == 0 ? self.linkList.length - 1 : self.counter - 1;

                        this.src = 'http://' + IPConfig.SERVER_IP + '/' + self.linkList[self.counter];
                        this.load();
                        this.play();

                    }, false);


                } else {
                    console.log("User profile failed to load!");
                }
            });

    }

    goLeft() {
        var video = this.myVideo.nativeElement;

        this.counter = this.counter == this.linkList.length - 1 ? 0 : this.counter + 1;

        video.src = 'http://' + IPConfig.SERVER_IP + '/' + this.linkList[this.counter];
        video.load();
        video.play();
    }

    goRight() {
        var video = this.myVideo.nativeElement;

        this.counter = this.counter == 0 ? this.linkList.length - 1 : this.counter - 1;

        video.src = 'http://' + IPConfig.SERVER_IP + '/' + this.linkList[this.counter];
        video.load();
        video.play();
    }

    goBack() {
        this.navCtrl.pop();
    }

}
