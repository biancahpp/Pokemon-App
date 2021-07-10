import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllPokemon } from './interfaces/allPokemon';
import { Pokemon } from './interfaces/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  originalPokeArr: Pokemon[] = [];

  filteredPokemon: any = new BehaviorSubject(this.originalPokeArr);

  constructor(private http: HttpClient) {
    this.getPokemonList().subscribe((data) => {
      data.results.forEach((basicPoke) => {
        const poke = {
          name: basicPoke.name,
          url: basicPoke.url,
          id: 0,
        };
        this.getPokeInfo(basicPoke.url).subscribe((data) => {
          poke.id = data.id;
        });
        this.originalPokeArr.push(poke);
      });
    });
  }

  getPokemonList(): Observable<AllPokemon> {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
    return this.http.get<AllPokemon>(url);
  }

  getPokeInfo(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  changeFiltered(data: any) {
    this.filteredPokemon.next(data);
  }
}
