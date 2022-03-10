import { usuario } from "./usuario";

export interface mangueira {
    id?: number,
    dataDeValidade: string,
    tipoMang: string,
    usuario: usuario
}
