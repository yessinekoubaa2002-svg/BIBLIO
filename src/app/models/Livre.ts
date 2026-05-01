import { Category } from './Category';

export interface Livre {
  id: number;

  titre: string;
  auteur: string;
  isbn: string;

  annee: number;
  quantite: number;

  disponible: boolean;

  category: Category; // relation
}