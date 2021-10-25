import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllPokemon } from './interfaces/allPokemon';
import { Pokemon } from './interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  originalPokeArr: any = [];

  filteredPokemon: any = new BehaviorSubject(this.originalPokeArr);

  constructor(private http: HttpClient) {
    this.getPokemonList().subscribe((data) => {
      data.results.forEach((basicPoke, index) => {
        const poke = {
          name: basicPoke.name,
          url: basicPoke.url,
          id: index + 1,
        };
        this.originalPokeArr.push(poke);
      });
      console.log(this.originalPokeArr);
    });
  }

  getPokemonList(): Observable<AllPokemon> {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
    return this.http.get<AllPokemon>(url);
  }

  getPokeInfo(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  changeFiltered(data: Pokemon[]) {
    this.filteredPokemon.next(data);
  }

  getPokemonById(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    return this.http.get<any>(url);
  }
}
