export interface Transacoes {
  id: string;
  nome: string;
  valor: number;
  tipo: "receita" | "despesa";
  data: string;
  categoria: string;
}