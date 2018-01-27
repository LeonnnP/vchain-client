import {IonicPage, NavController, NavParams} from 'ionic-angular';
import * as shape from 'd3-shape';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { colorSets } from './color-sets';
import { countries, generateHierarchialGraph, getTurbineData } from './data';
import chartGroups from './chartTypes';
import { id } from './id';
import { ActionSheetController } from 'ionic-angular';

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

    constructor(public actionSheetCtrl: ActionSheetController) {
        Object.assign(this, {
            countries,
            colorSets,
            chartGroups,
            hierarchialGraph: getTurbineData(),
        });

        this.setColorScheme('picnic');
        this.setInterpolationType('Bundle');
    }

    ngOnInit() {
        this.selectChart(this.chartType);

        setInterval(this.updateData.bind(this), 1000);

        if (!this.fitContainer) {
            this.applyDimensions();
        }
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
        this.presentActionSheet( data.label);
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

    presentActionSheet(id) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Video ' + id,
            buttons: [
                {
                    text: 'Contribute',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                },{
                    text: 'View',
                    handler: () => {
                        console.log('Archive clicked');
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
