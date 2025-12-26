import React, { createContext, useEffect, useState } from "react";
import { AppContextType } from "../../types/app-context";
import { Usuario } from "../../types/usuario";
import { obterUsuarios, criarUsuario, criarUsuarioApi } from "..";

const AppContext = createContext<AppContextType | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const carregaDadosUsuario = async () => {
    try {
      const usuarios = await obterUsuarios();
      setUsuario(usuarios[0]);
    } catch (error) {
      console.error("Erro ao carregar o usuário:", error);
    }
  };

  useEffect(() => {
    carregaDadosUsuario();
  }, []);

  const criarUsuario = async (usuario: Omit<Usuario, "id">) => {
    try {
      const novoUsuario = await criarUsuarioApi(usuario);
      setUsuario(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
    }
  };

  return <AppContext.Provider value={{usuario, criarUsuario}}>{children}</AppContext.Provider>;
};

export default AppProvider;
