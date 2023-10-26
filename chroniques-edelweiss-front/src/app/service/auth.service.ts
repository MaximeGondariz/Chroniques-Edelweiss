import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewUser, User } from 'src/assets/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  urlApi: string = 'http://localhost:8000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  connectedUser: User | undefined;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.checkAuth()
      .subscribe((value) => (this.connectedUser = value))
      .unsubscribe();
  }

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

  changeStatus(user: User, status: string){
    user.status = status;

    this.httpClient.put(this.urlApi + '/status', user).subscribe(() => window.location.reload());
  }

  changeFlowers(user: User, flowers: number){
    user.flowers += flowers;

    this.httpClient.put(this.urlApi + '/flowers', user).subscribe(() => window.location.reload());
  }

  deleteAccount(user: User){
    this.httpClient.delete(this.urlApi + '/delete', {body: user}).subscribe(() => window.location.reload());
  }

  logout() {
    this.httpClient.get<boolean>(this.urlApi + '/logout').subscribe(() => window.location.reload());
  }
}
