import { Partida } from './../shared/partida';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorService } from './../services/jogador.service';
import { Observable } from 'rxjs';
import { Jogador } from './../shared/jogador.model';
import { Component, OnInit } from '@angular/core';
import { Relacionado } from '../shared/relacionado';
import { RelacionadoService } from '../services/relacionado.service';
import { ToastController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-relacionado',
  templateUrl: './relacionado.page.html',
  styleUrls: ['./relacionado.page.scss'],
})
export class RelacionadoPage implements OnInit {

  private partida: Partida;

  public jogador: Jogador;
  public jogadores: Observable<any>;

  public relacionado: Relacionado;
  public relacionados: Observable<any>;

  public formRelacionado: FormGroup;

  private key_partida: string;

  constructor(
    private jogadorService: JogadorService,
    private relacionadoService: RelacionadoService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router) {
    this.key_partida = this.route.snapshot.paramMap.get('id');
    this.createFormRelacionado();
  }

  ngOnInit() {
    this.relacionados = this.relacionadoService.getAllA(this.key_partida)
    this.partida.key = this.key_partida;
    this.jogadores = this.jogadorService.getAll();
  }

  onSubmitRelacionado() {
    if (this.formRelacionado.valid) {
      this.relacionado.partida = this.partida;
      this.relacionado.jogador = this.jogador;
      this.relacionadoService.save(this.relacionado)
        .then(() => {
          this.formRelacionado.reset();
          this.sucesso('Atleta relacionado com sucesso!');
          // this.back();
        })
        .catch((e) => {
          this.erro('Não foi possível relacionar o atleta para a partida.');
          console.error(e);
        });

    } else {
      this.erro('Verifique os campos obrigatórios!')
    }
  }

  back() {
    this.router.navigate(['tab3',]);
  }

  createFormRelacionado() {
    this.partida = new Partida();
    this.relacionado = new Relacionado();
    this.formRelacionado = this.formBuilder.group({
      gols: [this.relacionado.gols, Validators.required],
      amarelo: [this.relacionado.amarelo, Validators.required],
      vermelho: [this.relacionado.vermelho, Validators.required],
      pagamento: [this.relacionado.pagamento, Validators.required],
      jogador: [this.relacionado.jogador, Validators.required],
    });
  }

  async sucesso(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: 'success'
    });
    toast.present();
  }

  async erro(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: 'danger'
    });
    toast.present();
  }


}
