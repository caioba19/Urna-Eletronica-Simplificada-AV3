export type TipoCargo = 'VEREADOR' | 'PREFEITO';

export interface CargoConfig {
  id: TipoCargo;
  nome: string;
  digitos: number;
}

export interface Partido {
  sigla: string;
  nome: string;
  cor: string;
}

export interface Candidato {
  nome: string;
  numero: string;
  partido: Partido;
  cargo: TipoCargo;
  vice?: string;
  fotoUrl: string;
}

export type TipoVoto = 'VALIDO' | 'BRANCO' | 'NULO';

export interface Voto {
  id?: string;
  cargo: TipoCargo;
  numero: string;
  tipo: TipoVoto;
  data: string;
}

export interface ResultadoCargo {
  cargo: TipoCargo;
  totalVotos: number;
  brancos: number;
  nulos: number;
  validos: number;
  candidatos: {
    candidato: Candidato;
    votos: number;
    porcentagemValidos: number;
  }[];
}
