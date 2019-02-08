import { JogadorService } from './../services/jogador.service';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { PartidaService } from '../services/partida.service';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { RelacionadoService } from '../services/relacionado.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page],
  providers: [PartidaService, JogadorService, RelacionadoService]
})
export class Tab3PageModule { }
