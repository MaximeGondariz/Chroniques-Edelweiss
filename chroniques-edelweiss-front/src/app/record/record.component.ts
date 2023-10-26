import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../service/records.service';
import { Records } from 'src/assets/interfaces/interfaces';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit{
  recordTable: Records[]= []

  recordShown: number|undefined = undefined;

  constructor(private recordsService: RecordsService){}

  ngOnInit(): void {
      this.recordsService.getRecords().subscribe(records => {
        this.recordTable = records
        this.recordShown = 0
      })
  }

  getRecordIndex(index: number){
    this.recordShown = index;
  }
}
