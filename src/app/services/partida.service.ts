import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Partida } from '../shared/partida';

@Injectable()
export class PartidaService {
    private PATH = 'partidas/';

    constructor(private db: AngularFireDatabase) {
    }

    getAll() {
        return this.db.list(this.PATH, ref => ref.orderByChild('dtPartida'))
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

    save(partida: Partida) {
        return new Promise((resolve, reject) => {
            if (partida.key) {
                this.db.list(this.PATH)
                    .update(partida.key, {
                        adversario: partida.adversario,
                        local: partida.local,
                        golPro: partida.golPro,
                        golContra: partida.golContra,
                        dtPartida: partida.dtPartida,
                        vitoria: partida.vitoria,
                        resenha: partida.resenha,
                    })
                    .then(() => resolve())
                    .catch((e) => reject(e));
            } else {
                this.db.list(this.PATH)
                    .push({
                        adversario: partida.adversario,
                        local: partida.local,
                        golPro: partida.golPro,
                        golContra: partida.golContra,
                        dtPartida: partida.dtPartida,
                        vitoria: partida.vitoria,
                        resenha: partida.resenha,
                    })
                    .then(() => resolve());
            }
        })
    }

    remove(key: string) {
        return this.db.list(this.PATH).remove(key);
    }
}