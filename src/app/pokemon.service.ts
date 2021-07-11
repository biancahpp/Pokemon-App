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
    this.getPokemonList().subscribe(async (data) => {
      data.results.forEach((basicPoke) => {
        const poke = {
          name: basicPoke.name,
          url: basicPoke.url,
          id: 0,
          weight: 0,
          height: 0,
          types: [],
        };
        this.getPokeInfo(basicPoke.url).subscribe((data) => {
          poke.id = data.id;
          poke.weight = data.weight;
          poke.height = data.height;
          poke.types = data.types;
        });
        this.originalPokeArr.push(poke);
      });

      this.originalPokeArr = await Promise.all(this.originalPokeArr);
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

  getPokemonById(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    return this.http.get<any>(url);
  }
}
