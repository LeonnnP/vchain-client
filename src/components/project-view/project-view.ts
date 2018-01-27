import {Component, Input} from '@angular/core';
import {Project} from "../../classes/Project";
import {NavController} from "ionic-angular";
import {ProjectViewPage} from "../../pages/project-view/project-view";

/**
 * Generated class for the ProjectViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'project-view',
    templateUrl: 'project-view.html'
})
export class ProjectViewComponent {

    @Input()
    project: Project;

    constructor(public navCtrl: NavController) {

    }

    onProjectClick(){
        this.navCtrl.push(ProjectViewPage, {project: this.project});
    }

}
