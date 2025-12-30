import React, { createContext, useContext, useEffect, useState } from "react";
import { AppContextType } from "../../types/app-context";
import { Usuario } from "../../types/usuario";
import { obterUsuarios, criarUsuario } from "..";

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

  const criaUsuario = async (usuario: Omit<Usuario, "id">) => {
    try {
      const novoUsuario = await criarUsuario(usuario);
      setUsuario(novoUsuario);
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
    }
  };

  return (
    <AppContext.Provider value={{ usuario,  criarUsuario: criaUsuario }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
