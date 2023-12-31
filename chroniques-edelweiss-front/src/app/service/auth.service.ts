import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser, User } from 'src/assets/interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  urlApi: string = 'http://localhost:8000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  //Récupère les utilisateurs
  getUsers(){
    return this.httpClient.get<User[]>(this.urlApi);
  }

  //Vérifie si l'utilisateur c'est bien identifier
  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    return this.httpClient.post<boolean>(this.urlApi + '/login', data);
  }

  //Vérifie si l'email est déjà utilisé
  checkSignIn(pseudo: string, email: string, password: string) {
    const newUser: NewUser = {
      pseudo: pseudo,
      email: email,
      password: password,
      status: 'player',
      flowers: 0,
    };

    return this.httpClient.post<boolean>(
      this.urlApi + '/checkSignin',
      newUser,
      this.httpOptions
    );
  }

  //Inscription de l'utilisateur
  signIn(pseudo: string, email: string, password: string) {
    const newUser: NewUser = {
      pseudo: pseudo,
      email: email,
      password: password,
      status: 'player',
      flowers: 0,
    };

    this.httpClient
      .post(this.urlApi + '/signin', newUser, this.httpOptions)
      .subscribe();
  }

  //Récupère l'utilisateur connécter
  checkAuth() {
    return this.httpClient.get<User>(this.urlApi + '/checklogin');
  }

  //Modifie l'utilisateur
  changeUser(user: User){
    this.httpClient.put(this.urlApi+ '/modify', user).subscribe(() => this.router.navigate(['/administration']) );
  }

  //Supprime l'utilisateur
  deleteAccount(user: User){
    this.httpClient.delete(this.urlApi + '/delete', {body: user}).subscribe(() => this.router.navigate(['/administration']));
  }

  //Déconnecte l'utilisateur
  logout() {
    this.httpClient.get<boolean>(this.urlApi + '/logout').subscribe(() => window.location.reload());
  }
}
