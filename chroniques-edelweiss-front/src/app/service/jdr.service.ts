import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JDR } from 'src/assets/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class JdrService {

  urlApi: string = 'http://localhost:8000/jdrs';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})};

  constructor(private httpClient: HttpClient) { }

  getJdrs(){
    return this.httpClient.get<JDR[]>(this.urlApi+"/")
  }
}
