import { Component } from '@angular/core';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {
  recordTable= [{
    name: 'Primevère',
    record: [{
      title: 'Nombre de mort lors de la première séance d\'un personnage',
      players: ['Windfast'],
      highscore: '2 morts'
    },
    {
      title: 'Durée de survie la plus courte',
      players: ['Windfast'],
      highscore: '2 heures'
    },
    {
      title: 'Nombre de mort d\'un même personnage',
      players: ['Noenra'],
      highscore: '2 morts'
    },
    {
      title: 'Fuite avec la plus grande durée',
      players: ['SMPK10', 'William Alpha'],
      highscore: '16 jours'
    }]
  },
  {
    name: 'Tournoi d\'Edelweiss',
    record: [{
      title: 'Nombre de fois où le titre de Champion a été obtenu',
      players: ['SMPK'],
      highscore: '2 fois'
    },
    {
      title: 'Nombre d\'année consécutive en ayant le titre',
      players: ['SMPK'],
      highscore: '2 années consécutives'
    },
    {
      title: 'Défaite la plus courte',
      players: ['Windfast'],
      highscore: '5 minutes'
    }]
  },
  {
    name: 'Pokemon',
    record: [{
      title: 'La plus grosse collection de pokémon',
      players: ['William Alpha'],
      highscore: '14 pokemons'
    },
    {
      title: 'Celui qui est le plus tombé KO lors d\'une séance',
      players: ['William Alpha'],
      highscore: '4 KO'
    }]
  }]

  recordShown = 1;

  constructor(){}

  getRecordIndex(index: number){
    this.recordShown = index;
  }
}
