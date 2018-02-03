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
import {VideoEditor} from '@ionic-native/video-editor';

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
    loaded = false;
    loaddata = null;
    fileObj = null;
    tagKey = '';
    tags = [];
    contribKey = null;
    callback;

    constructor(private videoEditor: VideoEditor, private projectService: ProjectServiceProvider, private file: File, public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture) {
        this.contribKey = this.navParams.get('contribKey')
        this.callback = this.navParams.get("callback")
    }

    ngOnInit() {
        this.videoURL = '';

        this.projectService.getTags().subscribe(
            data => {
                if (data.success) {
                    this.tags = data.result;
                    for (let i = 0; i < this.tags.length; i++) {
                        this.tags[i].arrayIndex = i;
                    }

                }
            });
    }

    addProject() {

        if (this.fileObj == null) return;

        var self = this;
        if (this.contribKey == undefined) {
            this.videoEditor.createThumbnail(
                {
                    fileUri: self.videoURL,
                    outputFileName: "12345",
                    atTime: 2,
                    width: 320,
                    height: 480,
                    quality: 100
                }).then(
                (URLdata) => { // file:///storage..
                    URLdata = "file:///" + URLdata;
                    self.loaddata = URLdata;
                    let indexX = URLdata.lastIndexOf('/'), finalPath2 = URLdata.substr(0, indexX);

                    this.file.readAsArrayBuffer(finalPath2, "12345.jpg").then((imageFile) => {

                            let blob = new Blob([imageFile], {type: 'image/jpg'});
                            let fileImage = this.projectService.blobToFile(blob, "12345.jpg");

                            let index = self.fileObj.fullPath.lastIndexOf('/'),
                                finalPath = self.fileObj.fullPath.substr(0, index);

                            self.file.readAsArrayBuffer(finalPath, self.fileObj.name).then((file) => {

                                    let blob2 = new Blob([file], {type: self.fileObj.type});
                                    let fileVideo = self.projectService.blobToFile(blob2, self.fileObj.name);

                                    this.projectService.addVideoRoot(this.videoTitle, this.tagKey, this.videoDescription, fileImage, fileVideo).subscribe(function () {


                                        self.navCtrl.pop();

                                    })

                                },
                                (err: CaptureError) => console.error(err)
                            );
                        },
                        (err) => {
                            self.loaddata = err;
                        })
                });
        }
        else {
            let index = self.fileObj.fullPath.lastIndexOf('/'),
                finalPath = self.fileObj.fullPath.substr(0, index);

            self.file.readAsArrayBuffer(finalPath, self.fileObj.name).then((file) => {

                    let blob2 = new Blob([file], {type: self.fileObj.type});
                    let fileVideo = self.projectService.blobToFile(blob2, self.fileObj.name);

                    this.projectService.appendToVideo(this.contribKey, fileVideo, this.videoTitle).subscribe(function () {

                        self.navCtrl.pop();

                    })

                },
                (err: CaptureError) => console.error(err)
            );
        }
    }

    public takeVideo() {
        let options: CaptureVideoOptions = {};
        this.mediaCapture.captureVideo({limit: 1, duration: 3})
            .then(
                (data: MediaFile[]) => {
                    let videoData = JSON.stringify(data);

                    let res1 = JSON.parse(videoData);

                    this.videoURL = res1[0]['fullPath'];

                    var video = this.myVideo.nativeElement;

                    video.src = this.videoURL;
                    video.play();

                    this.fileObj = {
                        fullPath: data[0].fullPath,
                        name: data[0].name,
                        type: data[0].type
                    }

                });
    }


}
