import axios from "axios";
import { Usuario } from "../types/usuario";
import { Transacoes } from "../types/transacoes";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const obterUsuario = async (): Promise<Usuario> => {
  const { data } = await api.get<Usuario>("/usuarios");
  return data;
};

export const criarUsuario = async (
  usuario: Omit<Usuario, "id">
): Promise<Usuario> => {
  const { data } = await api.post<Usuario>("/usuarios", usuario);
  return data;
};

export const obterTransacoes = async ():Promise<Transacoes[]> => {
  const {data} = await api.get<Transacoes[]>("/transacoes");
  return data;
}

export const criarTransacao = async (
  transacao: Omit<Transacoes, "id">
): Promise<Transacoes> => {
  const { data } = await api.post<Transacoes>("/transacoes", transacao);
  return data;
};

export default api;
