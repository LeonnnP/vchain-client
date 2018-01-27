import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {BranchViewPage} from "../pages/branch-view/branch-view";
import {LoginPage} from "../pages/login/login";
import {ProjectListPage} from "../pages/project-list/project-list";
import {ProjectViewPage} from "../pages/project-view/project-view";
import {UserProfilePage} from "../pages/user-profile/user-profile";
import {RegisterPage} from "../pages/register/register";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {ProjectServiceProvider} from '../providers/project-service/project-service';

import { HttpClientModule } from '@angular/common/http';
import {ProjectAddPage} from "../pages/project-add/project-add";
import {ProjectViewComponent} from "../components/project-view/project-view";

import {NgxGraphModule} from "@swimlane/ngx-graph"
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MediaCapture} from '@ionic-native/media-capture';

@NgModule({
    declarations: [
        MyApp,
        BranchViewPage,
        LoginPage,
        ProjectListPage,
        ProjectViewPage,
        UserProfilePage,
        RegisterPage,
        ProjectAddPage,
        ProjectViewComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        NgxGraphModule,
        NgxChartsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        BranchViewPage,
        LoginPage,
        ProjectListPage,
        ProjectViewPage,
        UserProfilePage,
        RegisterPage,
        ProjectAddPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthServiceProvider,
        ProjectServiceProvider,
        MediaCapture
    ]
})
export class AppModule {
}
