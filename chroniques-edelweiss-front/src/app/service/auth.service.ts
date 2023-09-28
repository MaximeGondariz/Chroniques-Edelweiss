import { Injectable, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { NewUser, User } from 'src/assets/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  urlApi: string = 'http://localhost:8000/users';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json',})};

  connectedUser: User | undefined

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkAuth()
      .subscribe(value => this.connectedUser = value)
      .unsubscribe()
  }

  login(email: string, password: string) {
    const data = {
      email: email, 
      password: password
    }
    
    return this.httpClient.post<boolean>(this.urlApi+"/login",data)
  }

  checkSignIn(pseudo: string, email: string, password: string){
    const newUser: NewUser = {
     pseudo: pseudo,
     email: email,
     password: password,
     role: 'player',
     flowers: 0
    }

    return this.httpClient.post(this.urlApi+"/checkSignin",newUser, this.httpOptions)
 }

  signIn(pseudo: string, email: string, password: string){
     const newUser: NewUser = {
      pseudo: pseudo,
      email: email,
      password: password,
      role: 'player',
      flowers: 0
     }

    this.httpClient.post(this.urlApi+"/signin",newUser, this.httpOptions).subscribe();
  }

  checkAuth(){
    return this.httpClient.get<User>(this.urlApi+"/checklogin")
  }

  logout(){
    this.httpClient.get<boolean>(this.urlApi+"/logout").subscribe();
  }
}
