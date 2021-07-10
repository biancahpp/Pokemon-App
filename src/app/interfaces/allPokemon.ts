import { BasicPokemon } from './basicPokemon';

export interface AllPokemon {
  count: number;
  next: string;
  previous: any;
  results: BasicPokemon[];
}
