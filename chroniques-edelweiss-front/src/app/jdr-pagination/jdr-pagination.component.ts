import { Component } from '@angular/core';

@Component({
  selector: 'app-jdr-pagination',
  templateUrl: './jdr-pagination.component.html',
  styleUrls: ['./jdr-pagination.component.scss']
})
export class JdrPaginationComponent {
  jdrTable: Array<{name: string, description: string}> = [
    {
      name: 'Primevère',
      description: 'LOREM IPSUM :=)'
    },
    {
      name: 'Donjon Explorer',
      description: 'LOREM IPSUM :=)'
    },
    {
      name: 'Pokemon',
      description: 'LOREM IPSUM :=)'
    },
  ]
}
