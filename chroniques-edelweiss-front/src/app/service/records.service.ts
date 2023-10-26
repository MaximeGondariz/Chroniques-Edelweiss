import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Records } from 'src/assets/interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  urlApi: string = 'http://localhost:8000/records';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})};

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  //Récupère les records
  getRecords(){
    return this.httpClient.get<Records[]>(this.urlApi+"/")
  }
}
