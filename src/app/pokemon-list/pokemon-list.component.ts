import { Component, OnInit } from '@angular/core';
import { BasicPokemon } from '../interfaces/basicPokemon';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokeArr: Pokemon[] = [];

  constructor(private pokemon: PokemonService) {
    this.pokemon.getPokemonList().subscribe((data) => {
      data.results.forEach((basicPoke) => {
        const poke = {
          name: basicPoke.name,
          url: basicPoke.url,
          id: 0,
        };
        this.pokemon.getPokeInfo(basicPoke.url).subscribe((data) => {
          poke.id = data.id;
        });
        this.pokeArr.push(poke);
      });
    });
  }

  ngOnInit(): void {}
}
