import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonService } from '../pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  poke: any = [];
  id: any;
  constructor(private pokemon: PokemonService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.pokemon.getPokemonById(this.id).subscribe((data: any) => {
      this.poke.name = data.name;
      this.poke.id = data.id;
      this.poke.weight = data.weight;
      this.poke.height = data.height;
      this.poke.types = data.types;
      console.log(this.poke);
    });
  }

  ngOnInit(): void {}
}
