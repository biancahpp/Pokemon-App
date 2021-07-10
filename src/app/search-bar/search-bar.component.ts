import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() filterText: string = '';

  constructor(private pokemon: PokemonService) {}

  filterPokes(event: string) {
    event !== ''
      ? this.pokemon.changeFiltered(
          this.pokemon.originalPokeArr.filter((el: any) =>
            el.name.includes(event)
          )
        )
      : this.pokemon.changeFiltered([...this.pokemon.originalPokeArr]);
  }

  ngOnInit(): void {}
}
