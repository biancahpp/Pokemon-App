import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllPokemon } from './interfaces/allPokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<AllPokemon> {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
    return this.http.get<AllPokemon>(url);
  }

  getPokeInfo(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
