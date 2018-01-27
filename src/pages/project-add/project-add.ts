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

    constructor(public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture) {

    }

    ngOnInit() {
        this.videoURL = '';
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
                },
                (err: CaptureError) => console.error(err)
            );
    }

}
