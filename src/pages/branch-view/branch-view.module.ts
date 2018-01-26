import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchViewPage } from './branch-view';

@NgModule({
  declarations: [
    BranchViewPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchViewPage),
  ],
})
export class BranchViewPageModule {}
