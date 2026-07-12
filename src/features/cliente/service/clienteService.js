import { api } from "../../../shared/services/api";

export const MAPPING_CONTROLLER = '/api/cliente'

export async function cadastrar(obj) {

    const response = await api.post(MAPPING_CONTROLLER, obj);
    return response.data;
}

export async function listar() {

    const response = await api.get(MAPPING_CONTROLLER);
    return response.data;
}

export async function buscarPorId(id) {

    const response = await api.get(MAPPING_CONTROLLER+'/'+id);
    return response.data;
}

export async function atualizar(obj) {

    const response = await api.put(MAPPING_CONTROLLER, obj);
    return response.data;
}

export async function remover(id) {

    await api.delete(MAPPING_CONTROLLER+'/'+id);
}