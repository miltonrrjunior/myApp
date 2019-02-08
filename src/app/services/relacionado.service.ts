import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Relacionado } from '../shared/relacionado';

@Injectable()
export class RelacionadoService {
    private PATH = 'relacionados/';

    constructor(private db: AngularFireDatabase) {
    }

    getAll() {
        return this.db.list(this.PATH, ref => ref.orderByChild('jogador'))
            .snapshotChanges().pipe(
                map(changes => {
                    return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
                })
            )
    }

    getAllA(key: string) {
        return this.db.list(this.PATH, ref => ref.orderByChild('partida/key').equalTo(key))
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

    save(relacionado: Relacionado) {
        return new Promise((resolve, reject) => {
            if (relacionado.key) {
                this.db.list(this.PATH)
                    .update(relacionado.key, {
                        gols: relacionado.gols,
                        amarelo: relacionado.amarelo,
                        vermelho: relacionado.vermelho,
                        pagamento: relacionado.pagamento,
                        jogador: relacionado.jogador,
                        partida: relacionado.partida,
                    })
                    .then(() => resolve())
                    .catch((e) => reject(e));
            } else {
                this.db.list(this.PATH)
                    .push({
                        gols: relacionado.gols,
                        amarelo: relacionado.amarelo,
                        vermelho: relacionado.vermelho,
                        pagamento: relacionado.pagamento,
                        jogador: relacionado.jogador,
                        partida: relacionado.partida,
                    })
                    .then(() => resolve());
            }
        })
    }

    remove(key: string) {
        return this.db.list(this.PATH).remove(key);
    }
}