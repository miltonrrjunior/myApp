import { Partida } from './../shared/partida';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastController, NavController } from '@ionic/angular';
import { PartidaService } from '../services/partida.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public form: FormGroup;

  public habilitaCampos = false;
  public habilitaRelacionar = false;

  public partida: Partida;
  public partidas: Observable<any>;

  constructor(public formBuilder: FormBuilder,
    public toastController: ToastController,
    private partidaService: PartidaService,
    private router: Router) {

    this.createForm();

  }

  ngOnInit(): void {
    this.partidas = this.partidaService.getAll();
  }

  new(): void {
    this.partida = new Partida();
    this.habilitaCampos = true;
  }

  onSubmit() {
    if (this.form.valid) {
      this.partidaService.save(this.partida)
        .then(() => {
          this.form.reset();
          this.sucesso('Partida salva com sucesso!');
          this.back();
        })
        .catch((e) => {
          this.erro('Não foi possível salvar a partida.');
          console.error(e);
        });

    } else {
      this.erro('Verifique os campos obrigatórios!')
    }
  }



  edit(partida: Partida) {
    this.partida = partida;
    this.habilitaCampos = true;
  }

  back(): void {
    this.habilitaCampos = false;
    this.habilitaRelacionar = false;
  }

  relacionar(): void {
    this.router.navigate(['/relacionado', this.partida.key]);
  }

  createForm() {
    this.partida = new Partida();
    this.form = this.formBuilder.group({
      adversario: [this.partida.adversario, Validators.required],
      dtPartida: [this.partida.dtPartida, Validators.required],
      golContra: [this.partida.golContra, Validators.required],
      golPro: [this.partida.golPro, Validators.required],
      local: [this.partida.local, Validators.required],
      resenha: [this.partida.resenha, Validators.required],
      vitoria: [this.partida.vitoria, Validators.required],
    });
  }

  remove() {
    this.partidaService.remove(this.partida.key)
      .then(s => {
        this.sucesso('Partida removida com sucesso!');
      })
      .catch(e => {
        this.erro('Não foi possível remover a partida!');
        console.log(e);
      });
    this.back();
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
