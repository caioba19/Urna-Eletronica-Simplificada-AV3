import { Candidato, CargoConfig, Partido } from '../types';

export const PARTIDOS: Record<string, Partido> = {
  PAD: {
    sigla: 'PAD',
    nome: 'Partido Aurora Digital',
    cor: '#2563eb',
  },
  PHV: {
    sigla: 'PHV',
    nome: 'Partido Horizonte Verde',
    cor: '#16a34a',
  },
  PMA: {
    sigla: 'PMA',
    nome: 'Partido Maré Alta',
    cor: '#0284c7',
  },
};

export const CONFIG_CARGOS: CargoConfig[] = [
  { id: 'VEREADOR', nome: 'VEREADOR(A)', digitos: 5 },
  { id: 'PREFEITO', nome: 'PREFEITO(A)', digitos: 2 },
];

export const CANDIDATOS: Candidato[] = [
  // Proporcionais (Vereador - 5 dígitos)
  {
    nome: 'Professora Ana Beatriz Luz',
    numero: '11111',
    cargo: 'VEREADOR',
    partido: PARTIDOS.PAD,
    fotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Carlos da Saúde - Vento Sul',
    numero: '11222',
    cargo: 'VEREADOR',
    partido: PARTIDOS.PAD,
    fotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Marina do Meio Ambiente',
    numero: '22333',
    cargo: 'VEREADOR',
    partido: PARTIDOS.PHV,
    fotoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Mestre Joaquim da Ladeira',
    numero: '22444',
    cargo: 'VEREADOR',
    partido: PARTIDOS.PHV,
    fotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Tereza do Farol',
    numero: '33555',
    cargo: 'VEREADOR',
    partido: PARTIDOS.PMA,
    fotoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Davi Recife Novo',
    numero: '33666',
    cargo: 'VEREADOR',
    partido: PARTIDOS.PMA,
    fotoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=280',
  },

  // Majoritários (Prefeito - 2 dígitos)
  {
    nome: 'Dra. Helena Ventura',
    numero: '11',
    cargo: 'PREFEITO',
    partido: PARTIDOS.PAD,
    vice: 'Rui Antunes (Engenheiro)',
    fotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Otávio Campos',
    numero: '22',
    cargo: 'PREFEITO',
    partido: PARTIDOS.PHV,
    vice: 'Lia Fontes (Liderança Comunitária)',
    fotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=280',
  },
  {
    nome: 'Beatriz Marés',
    numero: '33',
    cargo: 'PREFEITO',
    partido: PARTIDOS.PMA,
    vice: 'Prof. Nilo Batista',
    fotoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=280',
  },
];
