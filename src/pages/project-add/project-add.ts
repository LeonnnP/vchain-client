import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {
    MediaCapture,
    MediaFile,
    CaptureError,
    CaptureImageOptions,
    CaptureVideoOptions
} from '@ionic-native/media-capture';
import {VideoPlayer} from '@ionic-native/video-player';
import {File} from '@ionic-native/file';
import {ProjectServiceProvider} from "../../providers/project-service/project-service";

/**
 * Generated class for the ProjectAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-project-add',
    templateUrl: 'project-add.html',
})
export class ProjectAddPage {

    @ViewChild('myvideo') myVideo: any;
    videoURL: any = '';
    videoDescription: string = '';
    videoTitle: string = '';

    constructor(private projectService: ProjectServiceProvider, private file: File, public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture) {

    }

    ngOnInit() {
        this.videoURL = 'http://164.8.252.155:7456/pictures/fc71af88b05cf1e00f846951355ef24f';


        let video = this.myVideo.nativeElement;

        video.src = this.videoURL;
        video.play();

    }

    public takeVideo() {
        let options: CaptureVideoOptions = {};
        this.mediaCapture.captureVideo({limit: 1, duration: 3})
            .then(
                (data: MediaFile[]) => {
                    let videoData = JSON.stringify(data);

                    let res1 = JSON.parse(videoData);

                    this.videoURL = res1[0]['fullPath'];

                    let video = this.myVideo.nativeElement;

                    video.src = this.videoURL;
                    video.play();

                    let index = data[0].fullPath.lastIndexOf('/'), finalPath = data[0].fullPath.substr(0, index);
                    this.file.readAsArrayBuffer(finalPath, data[0].name).then((file) => {

                            let blob = new Blob([file], {type: data[0].type});
                            let f = this.projectService.blobToFile(blob, data[0].name);

                            this.projectService.addPicture("tutke", blob).subscribe(function(){
                                console.log('asd')
                            })

                        },
                        (err: CaptureError) => console.error(err)
                    );
                });
    }


}
