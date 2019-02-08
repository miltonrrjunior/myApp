import { PartidaService } from './../services/partida.service';
import { JogadorService } from './../services/jogador.service';
import { RelacionadoService } from './../services/relacionado.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RelacionadoPage } from './relacionado.page';

const routes: Routes = [
  {
    path: '',
    component: RelacionadoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: RelacionadoPage }])
  ],
  declarations: [RelacionadoPage],
  providers: [JogadorService, RelacionadoService, PartidaService]
})
export class RelacionadoPageModule { }
