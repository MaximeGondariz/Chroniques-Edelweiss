import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { JDR, newJDR } from 'src/assets/interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JdrService {

  urlApi: string = 'http://localhost:8000/jdrs';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})};

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  //Récupère les jdrs
  getJdrs(){
    return this.httpClient.get<JDR[]>(this.urlApi+"/")
  }

  createJdr(newJdr: newJDR){
    return this.httpClient.post<boolean>(this.urlApi + '/create',newJdr,this.httpOptions).subscribe(() => this.router.navigate(['/administration']));
  }

  //Modifie le jdr
  changeJdr(jdr: JDR){
    this.httpClient.put(this.urlApi+ '/modify', jdr).subscribe(() => window.location.reload());
  }

  //Supprime le jdr
  deleteJdr(jdr: JDR){
    this.httpClient.delete(this.urlApi + '/delete', {body: jdr}).subscribe(() => this.router.navigate(['/administration']));
  }
}
