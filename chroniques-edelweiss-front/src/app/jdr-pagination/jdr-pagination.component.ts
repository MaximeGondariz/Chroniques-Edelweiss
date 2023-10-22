import { Component, OnInit } from '@angular/core';
import { JdrService } from '../service/jdr.service';
import { JDR } from 'src/assets/interfaces/interfaces';

@Component({
  selector: 'app-jdr-pagination',
  templateUrl: './jdr-pagination.component.html',
  styleUrls: ['./jdr-pagination.component.scss'],
})
export class JdrPaginationComponent implements OnInit {
  jdrTable: JDR[] = [];

  constructor(private jdrService: JdrService) {}

  ngOnInit(): void {
    this.jdrService.getJdrs().subscribe((value) => {
      console.log(value);
      this.jdrTable = value;
    });
  }
}
