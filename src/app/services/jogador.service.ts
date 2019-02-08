import { Jogador } from './../shared/jogador.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable()
export class JogadorService {
  private PATH = 'jogadores/';

  constructor(private db: AngularFireDatabase) {
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      )
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .pipe(
        map(c => {
          return { key: c.key, ...c.payload.val() };
        })
      )
  }

  save(jogador: Jogador) {
    return new Promise((resolve, reject) => {
      if (jogador.key) {
        this.db.list(this.PATH)
          .update(jogador.key, { nome: jogador.nome, sobrenome: jogador.sobrenome })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: jogador.nome, sobrenome: jogador.sobrenome })
          .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}