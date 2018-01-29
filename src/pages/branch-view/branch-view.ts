import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as shape from 'd3-shape';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { colorSets } from './color-sets';
import { countries, generateHierarchialGraph, getTurbineData } from './data';
import chartGroups from './chartTypes';
import { id } from './id';
import { ActionSheetController } from 'ionic-angular';
import {ProjectServiceProvider} from "../../providers/project-service/project-service";
import {VideoViewPage} from "../video-view/video-view";
import {ProjectAddPage} from "../project-add/project-add";

/**
 * Generated class for the BranchViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-branch-view',
    templateUrl: 'branch-view.html',
})
export class BranchViewPage {

    version = '';

    theme = 'dark';
    chartType = 'directed-graph';
    chartGroups: any;
    chart: any;
    realTimeData: boolean = false;
    countries: any[];
    graph: { links: any[], nodes: any[] };
    hierarchialGraph: { links: any[], nodes: any[] };

    view: any[];
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    fitContainer: boolean = true;
    autoZoom: boolean = false;
    loaded = false;

    // options
    showLegend = false;
    orientation: string = 'TB'; // LR, RL, TB, BT
    orientations: any[] = [
        {
            label: 'Left to Right',
            value: 'LR'
        }, {
            label: 'Right to Left',
            value: 'RL'
        }, {
            label: 'Top to Bottom',
            value: 'TB'
        }, {
            label: 'Bottom to Top',
            value: 'BT'
        }
    ];

    // line interpolation
    curveType: string = 'Linear';
    curve: any = shape.curveLinear;
    interpolationTypes = [
        'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
        'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
    ];

    colorSets: any;
    colorScheme: any;
    schemeType: string = 'ordinal';
    selectedColorScheme: string;
    key: string;

    constructor(private projectService: ProjectServiceProvider, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {


        this.key = this.navParams.get('projectKey');
        this.projectService.getTree(this.key).subscribe(data => {
            console.log(data);


            let nodes = [];
            let links = [];

            for (let i=0; i<data.result.length; i++) {
                const node : any = {
                    "type": "lib",
                    "runner_type": "python",
                    "action": "turbine_twitter.get_time_line",
                    "retries": 2,
                    "params": {
                        "asset": "twitter",
                        "inputs": {
                            "count": 50
                        }
                    },
                    "publish": {
                        "pipe": "result"
                    },
                    "on-success": [
                        "get_url_from_text"
                    ]
                };

                node.id = data.result[i]._key;
                node.label = data.result[i].title;

                nodes.push(node);
            }

            for(let i=0; i<data.result.length; i++){

                if(!data.result[i].isRoot) {
                    links.push({
                        source: data.result[i].parent,
                        target: data.result[i]._key,
                        label: 'on error'
                    });
                }
            }

            Object.assign(this, {
                countries,
                colorSets,
                chartGroups,
                hierarchialGraph: {nodes: nodes, links: links},
            });

            this.setColorScheme('picnic');
            this.setInterpolationType('Bundle');

            this.selectChart(this.chartType);

            if (!this.fitContainer) {
                this.applyDimensions();
            }

            this.loaded = true;
        });
    }

    ngOnInit() {
    }

    openVideoView(key){
        this.navCtrl.push(VideoViewPage, {projectID: key})
    }

    contrib(key){
        var self = this;
        this.navCtrl.push(ProjectAddPage, {contribKey: key});
    }

    hiddenHack(){
        this.loaded = false;

        this.projectService.getTree(this.key).subscribe(data => {

            let nodes = [];
            let links = [];

            for (let i=0; i<data.result.length; i++) {
                const node : any = {
                    "type": "lib",
                    "runner_type": "python",
                    "action": "turbine_twitter.get_time_line",
                    "retries": 2,
                    "params": {
                        "asset": "twitter",
                        "inputs": {
                            "count": 50
                        }
                    },
                    "publish": {
                        "pipe": "result"
                    },
                    "on-success": [
                        "get_url_from_text"
                    ]
                };

                node.id = data.result[i]._key;
                node.label = data.result[i].title;

                nodes.push(node);
            }

            for(let i=0; i<data.result.length; i++){

                if(!data.result[i].isRoot) {
                    links.push({
                        source: data.result[i].parent,
                        target: data.result[i]._key,
                        label: 'on error'
                    });
                }
            }

            Object.assign(this, {
                countries,
                colorSets,
                chartGroups,
                hierarchialGraph: {nodes: nodes, links: links},
            });

            this.setColorScheme('picnic');
            this.setInterpolationType('Bundle');

            this.selectChart(this.chartType);

            if (!this.fitContainer) {
                this.applyDimensions();
            }

            this.loaded = true;
        });
    }

    updateData() {
        if (!this.realTimeData) {
            return;
        }

        const country = this.countries[Math.floor(Math.random() * this.countries.length)];
        const add = Math.random() < 0.7;
        const remove = Math.random() < 0.5;

        if (add) {
            // directed graph
            const hNode = {
                id: id(),
                label: country
            };

            this.hierarchialGraph.nodes.push(hNode);

            this.hierarchialGraph.links.push({
                source: this.hierarchialGraph.nodes[Math.floor(Math.random() * (this.hierarchialGraph.nodes.length - 1))].id,
                target: hNode.id,
                label: 'on success'
            });

            this.hierarchialGraph.links = [...this.hierarchialGraph.links];
            this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes];
        }
    }

    applyDimensions() {
        this.view = [this.width, this.height];
    }

    toggleFitContainer(fitContainer: boolean, autoZoom: boolean): void {
        this.fitContainer = fitContainer;
        this.autoZoom = autoZoom;

        if (this.fitContainer) {
            this.view = undefined;
        } else {
            this.applyDimensions();
        }
    }

    selectChart(chartSelector) {
        this.chartType = chartSelector;

        for (const group of this.chartGroups) {
            for (const chart of group.charts) {
                if (chart.selector === chartSelector) {
                    this.chart = chart;
                    return;
                }
            }
        }
    }

    select(data) {
        this.presentActionSheet(data.id, data.label);
    }

    setColorScheme(name) {
        this.selectedColorScheme = name;
        this.colorScheme = this.colorSets.find(s => s.name === name);
    }

    setInterpolationType(curveType) {
        this.curveType = curveType;
        if (curveType === 'Bundle') {
            this.curve = shape.curveBundle.beta(1);
        }
        if (curveType === 'Cardinal') {
            this.curve = shape.curveCardinal;
        }
        if (curveType === 'Catmull Rom') {
            this.curve = shape.curveCatmullRom;
        }
        if (curveType === 'Linear') {
            this.curve = shape.curveLinear;
        }
        if (curveType === 'Monotone X') {
            this.curve = shape.curveMonotoneX;
        }
        if (curveType === 'Monotone Y') {
            this.curve = shape.curveMonotoneY;
        }
        if (curveType === 'Natural') {
            this.curve = shape.curveNatural;
        }
        if (curveType === 'Step') {
            this.curve = shape.curveStep;
        }
        if (curveType === 'Step After') {
            this.curve = shape.curveStepAfter;
        }
        if (curveType === 'Step Before') {
            this.curve = shape.curveStepBefore;
        }
    }

    onLegendLabelClick(entry) {
        console.log('Legend clicked', entry);
    }

    toggleExpand(node) {
        console.log('toggle expand', node);
    }

    presentActionSheet(id, label) {
        let actionSheet = this.actionSheetCtrl.create({
            title: label,
            buttons: [
                {
                    text: 'Contribute',
                    handler: () => {
                        this.contrib(id);
                    }
                },{
                    text: 'View',
                    handler: () => {
                        this.openVideoView(id);
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

}
