import { Livre } from './Livre';

export interface Emprunt {
  id: number;

  dateEmprunt: string;        // LocalDate → string
  dateRetour?: string;        // optional

  valide: boolean;
  retourne: boolean;

  dateLimiteRetour: string;
  enRetard: boolean;

  livre: Livre;
}