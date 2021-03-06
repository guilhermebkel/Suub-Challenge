import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalExclusaoPage } from './modal-exclusao';

const routes: Routes = [
  {
    path: 'modal',
    component: ModalExclusaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalExclusaoPage]
})
export class ModalExclusaoPageModule {}
