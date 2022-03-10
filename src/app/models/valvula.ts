import { usuario } from "./usuario";

export interface valvula {
    id?: number,
    dataDeValidade: string,
    tipoVal: string,
    usuario: usuario
}
