import { Jogador } from './../shared/jogador.model';
import { JogadorService } from './../services/jogador.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public form: FormGroup;
  public habilitaCampos = false;

  public jogador: Jogador;
  public jogadores: Observable<any>;

  constructor(private jogadorService: JogadorService,
    public formBuilder: FormBuilder,
    public toastController: ToastController) {

    this.createForm();

  }

  ngOnInit(): void {
    this.jogadores = this.jogadorService.getAll();
  }

  new(): void {
    this.jogador = new Jogador();
    this.habilitaCampos = true;
  }

  back(): void {
    this.habilitaCampos = false;
  }

  onSubmit() {
    if (this.form.valid) {
      this.jogadorService.save(this.jogador)
        .then(() => {
          this.form.reset();
          this.sucesso('Jogador salvo com sucesso!');
          this.back();
        })
        .catch((e) => {
          this.erro('Não foi possível salvar o jogador.');
          console.error(e);
        });

    } else {
      this.erro('Verifique os campos obrigatórios!')
    }
  }

  edit(jogador: Jogador) {
    this.jogador = jogador;
    this.habilitaCampos = true;
  }

  remove() {
    this.jogadorService.remove(this.jogador.key)
      .then(s => {
        this.sucesso('Jogador removido com sucesso!');
      })
      .catch(e => {
        this.erro('Não foi possível remover o jogador!');
        console.log(e);
      });
    this.back();
  }

  createForm() {
    this.jogador = new Jogador();
    this.form = this.formBuilder.group({
      nome: [this.jogador.nome, Validators.required],
      sobrenome: [this.jogador.sobrenome, Validators.required],
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
