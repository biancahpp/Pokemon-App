import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokes: Pokemon[] = [];

  constructor(private pokemon: PokemonService) {
    this.pokemon.filteredPokemon.subscribe((data: any) => (this.pokes = data));
  }

  ngOnInit(): void {}
}
