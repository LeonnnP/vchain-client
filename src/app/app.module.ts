import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {TabsPage} from '../pages/tabs/tabs';
import {BranchViewPage} from "../pages/branch-view/branch-view";
import {LoginPage} from "../pages/login/login";
import {ProjectListPage} from "../pages/project-list/project-list";
import {ProjectViewPage} from "../pages/project-view/project-view";
import {UserProfilePage} from "../pages/user-profile/user-profile";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthServiceProvider} from '../providers/auth-service/auth-service';
import {ProjectServiceProvider} from '../providers/project-service/project-service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        BranchViewPage,
        LoginPage,
        ProjectListPage,
        ProjectViewPage,
        UserProfilePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        BranchViewPage,
        LoginPage,
        ProjectListPage,
        ProjectViewPage,
        UserProfilePage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthServiceProvider,
        ProjectServiceProvider
    ]
})
export class AppModule {
}
