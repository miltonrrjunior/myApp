import { Partida } from './partida';
import { Jogador } from './jogador.model';
export class Relacionado {

    key: string;
    gols: number;
    amarelo: boolean;
    vermelho: boolean;
    pagamento: number;
    jogador: Jogador;
    partida: Partida;

}
