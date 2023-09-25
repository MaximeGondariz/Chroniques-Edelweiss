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
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    },
    {
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    },
    {
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    }]
  },
  {
    name: 'Donjon Explorer',
    record: [{
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    },
    {
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    },
    {
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    }]
  },
  {
    name: 'Pokemon',
    record: [{
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    },
    {
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    },
    {
      title: 'LOREM IPSUM',
      players: [{
        pseudo: 'LOREM'
      }]
    }]
  }]

  recordShown: number | undefined;

  constructor(){}

  getRecordIndex(index: number){
    this.recordShown = index;
  }
}
