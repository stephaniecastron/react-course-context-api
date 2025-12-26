import { Usuario } from "./usuario";

export interface AppContextType {
  usuario: Usuario | null;
  criarUsuario: (usuario: Omit<Usuario, "id">) => Promise<void>;
}